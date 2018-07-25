import Realm from 'realm'
import { LocalDate } from 'js-joda'
import {
  cycleWithTempAndNoMucusShift,
  cycleWithFhm,
  longAndComplicatedCycle
} from './fixtures'

const TemperatureSchema = {
  name: 'Temperature',
  properties: {
    value: 'double',
    exclude: 'bool',
    time: {
      type: 'string',
      optional: true
    },
  }
}

const BleedingSchema = {
  name: 'Bleeding',
  properties: {
    value: 'int',
    exclude: 'bool'
  }
}

const MucusSchema = {
  name: 'Mucus',
  properties: {
    feeling: 'int',
    texture: 'int',
    value: 'int',
    exclude: 'bool'
  }
}

const CervixSchema = {
  name: 'Cervix',
  properties: {
    opening: 'int',
    firmness: 'int',
    position: {type: 'int', optional: true },
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
    },
    mucus: {
      type: 'Mucus',
      optional: true
    },
    cervix: {
      type: 'Cervix',
      optional: true
    }
  }
}

const realmConfig = {
  schema: [
    CycleDaySchema,
    TemperatureSchema,
    BleedingSchema,
    MucusSchema,
    CervixSchema
  ],
  // we only want this in dev mode
  deleteRealmIfMigrationNeeded: true
}

const db = new Realm(realmConfig)

const bleedingDaysSortedByDate = db.objects('CycleDay').filtered('bleeding != null').sorted('date', true)
const temperatureDaysSortedByDate = db.objects('CycleDay').filtered('temperature != null').sorted('date', true)

function saveSymptom(symptom, cycleDay, val) {
  db.write(() => {
    cycleDay[symptom] = val
  })
}

const cycleDaysSortedByDate = db.objects('CycleDay').sorted('date', true)

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

function fillWithDummyData() {
  const dummyCycles = [
    cycleWithFhm,
    longAndComplicatedCycle,
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

function deleteAll() {
  db.write(() => {
    db.deleteAll()
  })
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
  saveSymptom,
  getOrCreateCycleDay,
  bleedingDaysSortedByDate,
  temperatureDaysSortedByDate,
  cycleDaysSortedByDate,
  fillWithDummyData,
  deleteAll,
  getPreviousTemperature,
  getCycleDay
}
