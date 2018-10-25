import Realm from 'realm'
import { LocalDate, ChronoUnit } from 'js-joda'
import nodejs from 'nodejs-mobile-react-native'
import fs from 'react-native-fs'
import restart from 'react-native-restart'
import schemas from './schemas'
import cycleModule from '../lib/cycle'

let db
let isMensesStart
let getMensesDaysAfter

export async function openDb ({ hash, persistConnection }) {
  const realmConfig = {}
  if (hash) {
    realmConfig.encryptionKey = hashToInt8Array(hash)
  }

  // perform migrations if necessary, see https://realm.io/docs/javascript/2.8.0/#migrations
  let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath)
  while (nextSchemaIndex < schemas.length - 1) {
    const tempConfig = Object.assign(
      realmConfig,
      schemas[nextSchemaIndex++]
    )
    const migratedRealm = new Realm(tempConfig)
    migratedRealm.close()
  }

  // open the Realm with the latest schema
  realmConfig.schema = schemas[schemas.length - 1]
  const connection = await Realm.open(Object.assign(
    realmConfig,
    schemas[schemas.length - 1]
  ))

  if (persistConnection) db = connection
  const cycle = cycleModule()
  isMensesStart = cycle.isMensesStart
  getMensesDaysAfter = cycle.getMensesDaysAfter
}


export function getBleedingDaysSortedByDate() {
  return db.objects('CycleDay').filtered('bleeding != null').sorted('date', true)
}
export function getTemperatureDaysSortedByDate() {
  return db.objects('CycleDay').filtered('temperature != null').sorted('date', true)
}
export function getCycleDaysSortedByDate() {
  return db.objects('CycleDay').sorted('date', true)
}

export function getCycleStartsSortedByDate() {
  return db.objects('CycleDay').filtered('isCycleStart = true').sorted('date', true)
}

export function saveSymptom(symptom, cycleDay, val) {
  db.write(() => {
    if (symptom === 'bleeding') {
      saveBleeding(cycleDay, val)
    } else {
      cycleDay[symptom] = val
    }
  })
}

// TODO this also needs a test
export function saveBleeding(cycleDay, bleeding) {
  if (!bleeding) {
    updateCycleDayAndMaybeSetNewCycleStart(cycleDay, bleeding)
  } else {
    cycleDay.bleeding = bleeding
    cycleDay.isCycleStart = isMensesStart(cycleDay)
    maybeClearOldCycleStartsInThisMenses(cycleDay)
  }

  function updateCycleDayAndMaybeSetNewCycleStart(oldCycleDay, newValue) {
    // if a bleeding value is deleted, we need to check if
    // there are any following bleeding days and if the
    // next one of them is now a cycle start

    // in order to get the menses days, the cycle day in question still
    // has to have a bleeding value, so we get those days first and only
    // then update the cycle day
    const mensesDaysAfter = getMensesDaysAfter(oldCycleDay)
    oldCycleDay.bleeding = newValue
    oldCycleDay.isCycleStart = false

    if (!mensesDaysAfter.length) return

    const nextOne = mensesDaysAfter[mensesDaysAfter.length - 1]
    if (isMensesStart(nextOne)) {
      nextOne.isCycleStart = true
    }
  }

  function maybeClearOldCycleStartsInThisMenses(cycleDay) {
    // if we have a new bleeding day, we need to clear the
    // menses start marker from all following days of this
    // menses that may have been marked as start before
    const mensesDaysAfter = getMensesDaysAfter(cycleDay)
    mensesDaysAfter.forEach(day => day.isCycleStart = false)
  }
}

export function getOrCreateCycleDay(localDate) {
  let result = db.objectForPrimaryKey('CycleDay', localDate)
  if (!result) {
    db.write(() => {
      result = db.create('CycleDay', {
        date: localDate,
        isCycleStart: false
      })
    })
  }
  return result
}

export function getCycleDay(localDate) {
  return db.objectForPrimaryKey('CycleDay', localDate)
}

export function getPreviousTemperature(cycleDay) {
  cycleDay.wrappedDate = LocalDate.parse(cycleDay.date)
  const winner = getTemperatureDaysSortedByDate().find(day => {
    const wrappedDate = LocalDate.parse(day.date)
    return wrappedDate.isBefore(cycleDay.wrappedDate)
  })
  if (!winner) return null
  return winner.temperature.value
}

export function tryToCreateCycleDay(day, i) {
  try {
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
    cycleDays.forEach(tryToCreateCycleDay)
  })
}

export function tryToImportWithoutDelete(cycleDays) {
  db.write(() => {
    cycleDays.forEach((day, i) => {
      const existing = getCycleDay(day.date)
      if (existing) db.delete(existing)
      tryToCreateCycleDay(day, i)
    })
  })
}

export function requestHash(type, pw) {
  nodejs.channel.post('request-SHA512', JSON.stringify({
    type: type,
    message: pw
  }))
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
  // for some reason, realm complains if we give it a key with value undefined
  if (key) {
    db.writeCopyTo(copyPath, key)
  } else {
    db.writeCopyTo(copyPath)
  }
  db.close()
  await fs.unlink(defaultPath)
  await fs.moveFile(copyPath, defaultPath)
  restart.Restart()
}

export async function deleteDbAndOpenNew() {
  const exists = await fs.exists(Realm.defaultPath)
  if (exists) await fs.unlink(Realm.defaultPath)
  await openDb({ persistConnection: true })
}

function hashToInt8Array(hash) {
  const key = new Uint8Array(64)
  for (let i = 0; i < key.length; i++) {
    const twoDigitHex = hash.slice(i * 2, i * 2 + 2)
    key[i] = parseInt(twoDigitHex, 16)
  }
  return key
}
