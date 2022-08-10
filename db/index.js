import Realm from 'realm'
import { LocalDate, ChronoUnit } from '@js-joda/core'
import nodejs from 'nodejs-mobile-react-native'
import fs from 'react-native-fs'
import { restartApp } from './restart-app'

import schemas from './schemas'
import cycleModule from '../lib/cycle'
import maybeSetNewCycleStart from '../lib/set-new-cycle-start'

let db
let checkIsMensesStart
let getMensesDaysRightAfter

export async function openDb(hash) {
  const realmConfig = {}
  if (hash) {
    realmConfig.encryptionKey = hashToInt8Array(hash)
  }

  // perform migrations if necessary, see https://realm.io/docs/javascript/2.8.0/#migrations
  // we open the db temporarily, to get the schema version even if the db is encrypted
  let tempConnection
  try {
    tempConnection = await Realm.open(realmConfig)
  } catch (err) {
    const isErrorDecrypting = err.toString().includes('decrypt')
    const isErrorMnemonic = err.toString().includes('Invalid mnemonic')
    // tried to open without password, but is encrypted or incorrect pwd
    if (isErrorMnemonic) return false
    // cannot decrypt db with given pwd
    if (hash && isErrorDecrypting) return false

    throw err
  }

  let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath)
  tempConnection.close()
  while (nextSchemaIndex < schemas.length - 1) {
    const tempConfig = Object.assign(realmConfig, schemas[nextSchemaIndex++])
    const migratedRealm = new Realm(tempConfig)
    migratedRealm.close()
  }

  // open the Realm with the latest schema
  realmConfig.schema = schemas[schemas.length - 1]
  const connection = await Realm.open(
    Object.assign(realmConfig, schemas[schemas.length - 1])
  )

  db = connection
  const cycle = cycleModule()
  checkIsMensesStart = cycle.isMensesStart
  getMensesDaysRightAfter = cycle.getMensesDaysRightAfter
  return true
}

export function closeDb() {
  db.close()
}

export function mapRealmObjToJsObj(realmObj) {
  return realmObj ? JSON.parse(JSON.stringify(realmObj)) : realmObj
}

export function getBleedingDaysSortedByDate() {
  return db
    .objects('CycleDay')
    .filtered('bleeding != null')
    .sorted('date', true)
}
export function getTemperatureDaysSortedByDate() {
  return db
    .objects('CycleDay')
    .filtered('temperature != null')
    .sorted('date', true)
}

export function getCycleDaysSortedByDate() {
  const cycleDays = db.objects('CycleDay').sorted('date', true)
  return cycleDays
}

export function getCycleStartsSortedByDate() {
  return db
    .objects('CycleDay')
    .filtered('isCycleStart = true')
    .sorted('date', true)
}
export function saveSymptom(symptom, date, val) {
  let cycleDay = getCycleDay(date)
  if (!cycleDay) cycleDay = createCycleDay(date)

  db.write(() => {
    if (symptom === 'bleeding') {
      const mensesDaysAfter = getMensesDaysRightAfter(cycleDay)
      maybeSetNewCycleStart({
        val,
        cycleDay,
        mensesDaysAfter,
        checkIsMensesStart,
      })
    } else {
      cycleDay[symptom] = val
    }
  })
}

export function updateCycleStartsForAllCycleDays() {
  db.write(() => {
    getBleedingDaysSortedByDate().forEach((day) => {
      if (checkIsMensesStart(day)) {
        day.isCycleStart = true
      }
    })
  })
}

export function createCycleDay(dateString) {
  let result
  db.write(() => {
    result = db.create('CycleDay', {
      date: dateString,
      isCycleStart: false,
    })
  })
  return result
}

export function getCycleDay(dateString) {
  return db.objectForPrimaryKey('CycleDay', dateString)
}

export function getPreviousTemperatureForDate(date) {
  const targetDate = LocalDate.parse(date)
  const winner = getTemperatureDaysSortedByDate().find((candidate) => {
    return LocalDate.parse(candidate.date).isBefore(targetDate)
  })
  if (!winner) return null
  return winner.temperature.value
}

function tryToCreateCycleDayFromImport(day, i) {
  try {
    // we cannot know this yet, gets detected afterwards
    day.isCycleStart = false
    db.create('CycleDay', day)
  } catch (err) {
    const msg = `Line ${i + 1}(${day.date}): ${err.message}`
    throw new Error(msg)
  }
}

export function getAmountOfCycleDays() {
  const cycleDaysSortedByDate = getCycleDaysSortedByDate()
  const amountOfCycleDays = cycleDaysSortedByDate.length
  if (!amountOfCycleDays) return 0
  const earliest = cycleDaysSortedByDate[amountOfCycleDays - 1]
  const today = LocalDate.now()
  const earliestAsLocalDate = LocalDate.parse(earliest.date)
  return earliestAsLocalDate.until(today, ChronoUnit.DAYS)
}

export function getSchema() {
  return db.schema.reduce((acc, curr) => {
    acc[curr.name] = curr.properties
    return acc
  }, {})
}

export function tryToImportWithDelete(cycleDays) {
  db.write(() => {
    db.delete(db.objects('CycleDay'))
    cycleDays.forEach(tryToCreateCycleDayFromImport)
  })
}

export function tryToImportWithoutDelete(cycleDays) {
  db.write(() => {
    cycleDays.forEach((day, i) => {
      const existing = getCycleDay(day.date)
      if (existing) db.delete(existing)
      tryToCreateCycleDayFromImport(day, i)
    })
  })
}

export function requestHash(type, pw) {
  nodejs.channel.post(
    'request-SHA512',
    JSON.stringify({
      type: type,
      message: pw,
    })
  )
}

export async function changeEncryptionAndRestartApp(hash) {
  let key
  if (hash) key = hashToInt8Array(hash)
  const defaultPath = db.path
  const dir = db.path.split('/')
  dir.pop()
  dir.push('copied.realm')
  const copyPath = dir.join('/')
  const exists = await fs.exists(copyPath)
  if (exists) await fs.unlink(copyPath)
  db.writeCopyTo({ path: copyPath, encryptionKey: key })
  db.close()
  await fs.unlink(defaultPath)
  await fs.moveFile(copyPath, defaultPath)
  restartApp()
}

export function isDbEmpty() {
  return db.empty
}

export async function deleteDbAndOpenNew() {
  const exists = await fs.exists(Realm.defaultPath)
  if (exists) await fs.unlink(Realm.defaultPath)
  await openDb()
}

export function clearDb() {
  db.write(db.deleteAll)
}

function hashToInt8Array(hash) {
  const key = new Uint8Array(64)
  for (let i = 0; i < key.length; i++) {
    const twoDigitHex = hash.slice(i * 2, i * 2 + 2)
    key[i] = parseInt(twoDigitHex, 16)
  }
  return key
}
