import Realm from 'realm'

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

const db = new Realm({
  schema: [
    CycleDaySchema,
    TemperatureSchema,
    BleedingSchema
  ],
  // we only want this in dev mode
  deleteRealmIfMigrationNeeded: true
})

const cycleDaysSortedbyTempValueView = db.objects('CycleDay').filtered('temperature != null').sorted('temperature.value', true)
const bleedingDaysSortedByDate = db.objects('CycleDay').filtered('bleeding != null').sorted('date', true)

function saveTemperature(date, temperature) {
  db.write(() => {
    const doc = {
      date,
      temperature
    }
    db.create('CycleDay', doc)
  })
}

const getCycleDaysSortedByDateView = () => db.objects('CycleDay').sorted('date', true)

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

function deleteAll() {
  db.write(() => {
    db.deleteAll()
  })
}

export {
  cycleDaysSortedbyTempValueView,
  saveTemperature,
  saveBleeding,
  getOrCreateCycleDay,
  bleedingDaysSortedByDate,
  getCycleDaysSortedByDateView,
  deleteAll
}