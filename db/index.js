import Realm from 'realm'
import { LocalDate, ChronoUnit } from 'js-joda'
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
    note: {
      type: 'string',
      optional: true
    }
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

const NoteSchema = {
  name: 'Note',
  properties: {
    value: 'string'
  }
}

const DesireSchema = {
  name: 'Desire',
  properties: {
    value: 'int'
  }
}

const SexSchema = {
  name: 'Sex',
  properties: {
    solo: { type: 'bool', optional: true },
    partner: { type: 'bool', optional: true },
    condom: { type: 'bool', optional: true },
    pill: { type: 'bool', optional: true },
    iud: { type: 'bool', optional: true },
    patch: { type: 'bool', optional: true },
    ring: { type: 'bool', optional: true },
    implant: { type: 'bool', optional: true },
    other: { type: 'bool', optional: true },
    note: { type: 'string', optional: true }
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
    },
    note: {
      type: 'Note',
      optional: true
    },
    desire: {
      type: 'Desire',
      optional: true
    },
    sex: {
      type: 'Sex',
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
    CervixSchema,
    NoteSchema,
    DesireSchema,
    SexSchema
  ],
  // we only want this in dev mode
  deleteRealmIfMigrationNeeded: true
}

const db = new Realm(realmConfig)

const bleedingDaysSortedByDate = db.objects('CycleDay').filtered('bleeding != null').sorted('date', true)
const temperatureDaysSortedByDate = db.objects('CycleDay').filtered('temperature != null').sorted('date', true)
const cycleDaysSortedByDate = db.objects('CycleDay').sorted('date', true)

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

const schema = db.schema.reduce((acc, curr) => {
  acc[curr.name] = curr.properties
  return acc
}, {})

function tryToCreateCycleDay(day, i) {
  try {
    db.create('CycleDay', day)
  } catch (err) {
    const msg = `Line ${i + 1}(${day.date}): ${err.message}`
    throw new Error(msg)
  }
}

function getAmountOfCycleDays() {
  const amountOfCycleDays = cycleDaysSortedByDate.length
  if (!amountOfCycleDays) return 0
  const earliest = cycleDaysSortedByDate[amountOfCycleDays - 1]
  const today = LocalDate.now()
  const earliestAsLocalDate = LocalDate.parse(earliest.date)
  return earliestAsLocalDate.until(today, ChronoUnit.DAYS)
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

export {
  saveSymptom,
  getOrCreateCycleDay,
  bleedingDaysSortedByDate,
  temperatureDaysSortedByDate,
  cycleDaysSortedByDate,
  fillWithDummyData,
  deleteAll,
  getPreviousTemperature,
  getCycleDay,
  getAmountOfCycleDays,
  schema,
  tryToImportWithDelete,
  tryToImportWithoutDelete
}
