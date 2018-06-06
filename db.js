import realm from 'realm'

let db

let bleedingDaysSortedByDate = []
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

  bleedingDaysSortedByDate = db.objects('CycleDay').fil<<<<<<< 933b64056a13d04c3bfdebf531962b84d9daa4ce
  // just for testing purposes, the highest temperature will be topmost
  // because I was too layz to make a scroll view
  cycleDaysSortedbyTempValueView = db.objects('CycleDay').filtered('temperature != null').sorted('temperature.value', true) tered('bleeding != null').sorted('date', true)
  cycleDaysSortedbyDate = db.objects('CycleDay').sorted('date', true)
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

export {
  openDatabase,
  saveTemperature,
  saveBleeding,
  getOrCreateCycleDay,
  bleedingDaysSortedByDate
}
