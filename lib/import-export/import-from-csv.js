import csvParser from 'csvtojson'
import isObject from 'isobject'
import { db, getCycleDay } from '../../db'
import getColumnNamesForCsv from './get-csv-column-names'

export default async function importCsv(csv, deleteFirst) {
  const parseFuncs = {
    bool: val => {
      if (val.toLowerCase() === 'true') return true
      if (val.toLowerCase() === 'false') return false
      return val
    },
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

  const cycleDayDbSchema = db.schema.find(x => x.name === 'CycleDay').properties
  const config = {
    ignoreEmpty: true,
    colParser: getColumnNamesForCsv().reduce((acc, colName) => {
      const path = colName.split('.')
      const dbType = getDbType(cycleDayDbSchema, path)
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

  if (deleteFirst) {
    db.write(() => {
      db.delete(db.objects('CycleDay'))
      cycleDays.forEach(tryToCreateCycleDay)
    })
  } else {
    db.write(() => {
      cycleDays.forEach((day, i) => {
        const existing = getCycleDay(day.date)
        if (existing) {
          db.delete(existing)
        }
        tryToCreateCycleDay(day, i)
      })
    })
  }
}

function tryToCreateCycleDay(day, i) {
  try {
    db.create('CycleDay', day)
  } catch (err) {
    const msg = `Error for line ${i + 1}(${day.date}): ${err.message}`
    throw new Error(msg)
  }
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

function getDbType(modelProperties, path) {
  if (path.length === 1) return modelProperties[path[0]].type
  const modelName = modelProperties[path[0]].objectType
  const model = db.schema.find(x => x.name === modelName)
  return getDbType(model.properties, path.slice(1))
}