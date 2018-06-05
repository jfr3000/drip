import realm from 'realm'
import { v4 as uuid } from 'uuid'

let db
let cycleDaysSortedbyTempValueView = []
let cycleDaysSortedbyDate = []

const TemperatureSchema = {
  name: 'Temperature',
  properties: {
    value: 'double',
    exclude: 'bool'
  }
}

const BleedingSchema = {
  name: 'Bleeding',
  properties: {
    value: 'int',
    exclude: 'bool'
  }
}

const CycleDaySchema = {
  name: 'CycleDay',
  primaryKey: 'key',
  properties: {
    key: 'string',
    date: 'date',
    temperature: {
      type: 'Temperature',
      optional: true
    },
    bleeding: {
      type: 'Bleeding',
      optional: true
    }
  }
}

async function openDatabase() {
  db = await realm.open({
    schema: [
      CycleDaySchema,
      TemperatureSchema,
      BleedingSchema
    ],
    // we only want this in dev mode
    deleteRealmIfMigrationNeeded: true
  })
  // just for testing purposes, the highest temperature will be topmost
  // because I was too layz to make a scroll view
  cycleDaysSortedbyTempValueView = db.objects('CycleDay').sorted('temperature.value', true)
  cycleDaysSortedbyDate = db.objects('CycleDay').sorted('date', true)
}

function saveTemperature(date, temperature) {
  db.write(() => {
    const doc = {
      key: uuid(),
      date,
      temperature
    }
    db.create('CycleDay', doc)
  })
}

function saveBleeding(cycleDay, bleeding) {
  db.write(() => {
    cycleDay.bleeding = bleeding
  })
}

function getOrCreateCycleDay(date) {
  let result = Array.from(cycleDaysSortedbyDate.filtered('date = $0', date))[0]
  if (!result) {
    db.write(() => {
      result = db.create('CycleDay', {
        key: uuid(),
        date
      })
    })
  }
  return result
}

export {
  cycleDaysSortedbyTempValueView,
  openDatabase,
  saveTemperature,
  saveBleeding,
  getOrCreateCycleDay
}