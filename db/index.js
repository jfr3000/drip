import Realm from 'realm'
import { LocalDate, ChronoUnit } from 'js-joda'
import nodejs from 'nodejs-mobile-react-native'
import fs from 'react-native-fs'
import restart from 'react-native-restart'
import {
  cycleWithFhmMucus,
  longAndComplicatedCycleWithMucus,
  cycleWithTempAndNoMucusShift,
  cycleWithFhmCervix,
  longAndComplicatedCycleWithCervix,
  cycleWithTempAndNoCervixShift
} from './fixtures'
import { saveEncryptionFlag } from '../local-storage'
import dbSchema from './schema'

let db
const realmConfig = {
  schema: dbSchema
}

export async function openDbConnection(key) {
  realmConfig.encryptionKey = key
  db = await Realm.open(realmConfig)
}

function getBleedingDaysSortedByDate() {
  return db.objects('CycleDay').filtered('bleeding != null').sorted('date', true)
}
function getTemperatureDaysSortedByDate() {
  return db.objects('CycleDay').filtered('temperature != null').sorted('date', true)
}
function getCycleDaysSortedByDate() {
  return db.objects('CycleDay').sorted('date', true)
}

function saveSymptom(symptom, cycleDay, val) {
  db.write(() => {
    cycleDay[symptom] = val
  })
}

function getOrCreateCycleDay(localDate) {
  let result = db.objectForPrimaryKey('CycleDay', localDate)
  if (!result) {
    db.write(() => {
      result = db.create('CycleDay', {
        date: localDate
      })
    })
  }
  return result
}

function getCycleDay(localDate) {
  return db.objectForPrimaryKey('CycleDay', localDate)
}

function fillWithMucusDummyData() {
  const dummyCycles = [
    cycleWithFhmMucus,
    longAndComplicatedCycleWithMucus,
    cycleWithTempAndNoMucusShift
  ]

  db.write(() => {
    db.deleteAll()
    dummyCycles.forEach(cycle => {
      cycle.forEach(day => {
        const existing = getCycleDay(day.date)
        if (existing) {
          Object.keys(day).forEach(key => {
            if (key === 'date') return
            existing[key] = day[key]
          })
        } else {
          db.create('CycleDay', day)
        }
      })
    })
  })
}

function fillWithCervixDummyData() {
  const dummyCycles = [
    cycleWithFhmCervix,
    longAndComplicatedCycleWithCervix,
    cycleWithTempAndNoCervixShift
  ]

  db.write(() => {
    db.deleteAll()
    dummyCycles.forEach(cycle => {
      cycle.forEach(day => {
        const existing = getCycleDay(day.date)
        if (existing) {
          Object.keys(day).forEach(key => {
            if (key === 'date') return
            existing[key] = day[key]
          })
        } else {
          db.create('CycleDay', day)
        }
      })
    })
  })
}


function deleteAll() {
  db.write(() => {
    db.deleteAll()
  })
}

function getPreviousTemperature(cycleDay) {
  cycleDay.wrappedDate = LocalDate.parse(cycleDay.date)
  const winner = getTemperatureDaysSortedByDate().find(day => {
    const wrappedDate = LocalDate.parse(day.date)
    return wrappedDate.isBefore(cycleDay.wrappedDate)
  })
  if (!winner) return null
  return winner.temperature.value
}

function tryToCreateCycleDay(day, i) {
  try {
    db.create('CycleDay', day)
  } catch (err) {
    const msg = `Line ${i + 1}(${day.date}): ${err.message}`
    throw new Error(msg)
  }
}

function getAmountOfCycleDays() {
  const cycleDaysSortedByDate = getCycleDaysSortedByDate()
  const amountOfCycleDays = cycleDaysSortedByDate.length
  if (!amountOfCycleDays) return 0
  const earliest = cycleDaysSortedByDate[amountOfCycleDays - 1]
  const today = LocalDate.now()
  const earliestAsLocalDate = LocalDate.parse(earliest.date)
  return earliestAsLocalDate.until(today, ChronoUnit.DAYS)
}

function getSchema() {
  return db.schema.reduce((acc, curr) => {
    acc[curr.name] = curr.properties
    return acc
  }, {})
}

function tryToImportWithDelete(cycleDays) {
  db.write(() => {
    db.delete(db.objects('CycleDay'))
    cycleDays.forEach(tryToCreateCycleDay)
  })
}

function tryToImportWithoutDelete(cycleDays) {
  db.write(() => {
    cycleDays.forEach((day, i) => {
      const existing = getCycleDay(day.date)
      if (existing) db.delete(existing)
      tryToCreateCycleDay(day, i)
    })
  })
}

function requestHash(pw) {
  console.log('requesting hash')
  nodejs.channel.send(JSON.stringify({
    type: 'request-SHA512',
    message: pw || 'mypassword'
  }))
}

async function encryptAndRestartApp(key) {
  const oldPath = db.path
  const dir = db.path.split('/')
  dir.pop()
  dir.push('copied.realm')
  const copyPath = dir.join('/')
  const exists = await fs.exists(copyPath)
  if (exists) await fs.unlink(copyPath)
  db.writeCopyTo(copyPath)
  db.close()
  await fs.unlink(oldPath)
  realmConfig.encryptionKey = key
  db = new Realm(realmConfig)
  await saveEncryptionFlag(true)
  restart.Restart()
}

export {
  saveSymptom,
  getOrCreateCycleDay,
  fillWithMucusDummyData,
  fillWithCervixDummyData,
  getBleedingDaysSortedByDate,
  getTemperatureDaysSortedByDate,
  getCycleDaysSortedByDate,
  deleteAll,
  getPreviousTemperature,
  getCycleDay,
  getAmountOfCycleDays,
  getSchema,
  tryToImportWithDelete,
  tryToImportWithoutDelete,
  requestHash,
  encryptAndRestartApp
}
