import Realm from 'realm'
import { LocalDate } from 'js-joda'
import { Base64 } from 'js-base64'
import objectPath from 'object-path'
import csvParser from 'csvtojson'
import isObject from 'isobject'

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
    DesireSchema
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

function getCycleDaysAsCsvDataUri() {
  if (!cycleDaysSortedByDate.length) return null
  const csv = transformToCsv(cycleDaysSortedByDate)
  const encoded = Base64.encodeURI(csv)
  return `data:text/csv;base64,${encoded}`

  function transformToCsv() {
    const columnNames = getColumnNamesForCsv()
    const rows = cycleDaysSortedByDate
      .map(day => {
        return columnNames.map(column => {
          return objectPath.get(day, column, '')
        })
      })
      .map(row => row.join(','))

    rows.unshift(columnNames.join(','))
    return rows.join('\n')

  }
}

function getColumnNamesForCsv() {
  return getPrefixedKeys('CycleDay')

  function getPrefixedKeys(schemaName, prefix) {
    const schema = db.schema.find(x => x.name === schemaName).properties
    return Object.keys(schema).reduce((acc, key) => {
      const prefixedKey = prefix ? [prefix, key].join('.') : key
      const childSchemaName = schema[key].objectType
      if (!childSchemaName) {
        acc.push(prefixedKey)
        return acc
      }
      acc.push(...getPrefixedKeys(childSchemaName, prefixedKey))
      return acc
    }, [])
  }
}

function getDbType(modelProperties, path) {
  if (path.length === 1) return modelProperties[path[0]].type
  const modelName = modelProperties[path[0]].objectType
  const model = db.schema.find(x => x.name === modelName)
  return getDbType(model.properties, path.slice(1))
}

async function importCsv(csv, deleteFirst) {
  const cycleDayProperties = db.schema.find(x => x.name === 'CycleDay').properties
  const parseFuncs = {
    bool: val => val.toLowerCase() === 'false' ? false : true,
    int: parseNumberIfPossible,
    float: parseNumberIfPossible,
    double: parseNumberIfPossible,
    string: val => val
  }

  function parseNumberIfPossible(val) {
    // Number and parseFloat catch different cases of weirdness,
    // so we test them both
    if (isNaN(Number(val)) || isNaN(parseFloat(val))) return val
    return Number(val)
  }

  const config = {
    colParser: getColumnNamesForCsv().reduce((acc, colName) => {
      const path = colName.split('.')
      const dbType = getDbType(cycleDayProperties, path)
      acc[colName] = item => {
        if (item === '') return null
        return parseFuncs[dbType](item)
      }
      return acc
    }, {})
  }

  let cycleDays
  try {
    cycleDays = await csvParser(config)
      .fromString(csv)
      .on('header', validateHeaders)
  } catch(err) {
    // TODO
    console.log(err)
  }

  //remove symptoms where all fields are null
  putNullForEmptySymptoms(cycleDays)

  db.write(() => {
    db.delete(db.objects('CycleDay'))
    cycleDays.forEach((day, i) => {
      try {
        db.create('CycleDay', day)
      } catch (err) {
        const msg = `Error for line ${i + 1}(${day.date}): ${err.message}`
        throw new Error(msg)
      }
    })
  })
}

function validateHeaders(headers) {
  const expectedHeaders = getColumnNamesForCsv()
  if (!headers.every(header => {
    return expectedHeaders.indexOf(header) > -1
  })) {
    const msg = `Expected CSV column titles to be ${expectedHeaders.join()}`
    throw new Error(msg)
  }
}

function putNullForEmptySymptoms(data) {
  data.forEach(replaceWithNullIfAllPropertiesAreNull)

  function replaceWithNullIfAllPropertiesAreNull(obj) {
    Object.keys(obj).forEach((key) => {
      if (!isObject(obj[key])) return
      if (Object.values(obj[key]).every(val => val === null)) {
        obj[key] = null
        return
      }
      replaceWithNullIfAllPropertiesAreNull(obj[key])
    })
  }

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
  getCycleDaysAsCsvDataUri,
  importCsv
}
