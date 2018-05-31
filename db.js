import realm from 'realm'
import { v4 as uuid } from 'uuid'

let db
let cycleDaysSortedbyTempValueView = []

const TemperatureSchema = {
  name: 'Temperature',
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
    }
  }
}

async function openDatabase() {
  db = await realm.open({
    schema: [
      CycleDaySchema,
      TemperatureSchema
    ],
    // we only want this in dev mode
    deleteRealmIfMigrationNeeded: true
  })
  // just for testing purposes, the highest temperature will be topmost
  // because I was too layz to make a scroll view
  cycleDaysSortedbyTempValueView = db.objects('CycleDay').sorted('temperature.value', true)
}

async function saveTemperature(date, temperature) {
  db.write(() => {
    const doc = {
      key: uuid(),
      date,
      temperature
    }
    db.create('CycleDay', doc)
  })
}

export {
  cycleDaysSortedbyTempValueView,
  openDatabase,
  saveTemperature
}