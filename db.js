import realm from 'realm'
import { LocalDate } from 'js-joda'

let db
let cycleDaysSortedbyDate = []
let bleedingDaysSortedByDate = []
let temperatureDaysSortedByDate

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
  primaryKey: 'date',
  properties: {
    date: 'string',
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

  cycleDaysSortedbyDate = db.objects('CycleDay').sorted('date', true)
  bleedingDaysSortedByDate = db.objects('CycleDay').filtered('bleeding != null').sorted('date', true)
  temperatureDaysSortedByDate = db.objects('CycleDay').filtered('temperature != null').sorted('date', true)
}

function saveTemperature(cycleDay, temperature) {
  db.write(() => {
    cycleDay.temperature = temperature
  })
}

function saveBleeding(cycleDay, bleeding) {
  db.write(() => {
    cycleDay.bleeding = bleeding
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

function getPreviousTemperature(cycleDay) {
  cycleDay.wrappedDate = LocalDate.parse(cycleDay.date)
  const winner = temperatureDaysSortedByDate.find(day => {
    const wrappedDate = LocalDate.parse(day.date)
    return wrappedDate.isBefore(cycleDay.wrappedDate)
  })
  if (!winner) return null
  return winner.temperature.value
}

export {
  cycleDaysSortedbyDate,
  openDatabase,
  saveTemperature,
  saveBleeding,
  getOrCreateCycleDay,
  bleedingDaysSortedByDate,
  getPreviousTemperature
}
