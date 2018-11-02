import csvParser from 'csvtojson'
import isObject from 'isobject'
import {
  getSchema,
  tryToImportWithDelete,
  tryToImportWithoutDelete,
  updateCycleStartsForAllCycleDays
} from '../../db'
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

  const schema = getSchema()
  const config = {
    ignoreEmpty: true,
    colParser: getColumnNamesForCsv().reduce((acc, colName) => {
      const path = colName.split('.')
      const dbType = getDbType(schema.CycleDay, path)
      acc[colName] = item => {
        if (item === '') return null
        return parseFuncs[dbType](item)
      }
      return acc
    }, {})
  }

  const cycleDays = await csvParser(config)
    .fromString(csv)
    .on('header', validateHeaders)

  //remove symptoms where all fields are null
  putNullForEmptySymptoms(cycleDays)

  if (deleteFirst) {
    tryToImportWithDelete(cycleDays)
  } else {
    tryToImportWithoutDelete(cycleDays)
  }
  updateCycleStartsForAllCycleDays()
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
  const schema = getSchema()
  if (path.length === 1) return modelProperties[path[0]].type
  const modelName = modelProperties[path[0]].objectType
  return getDbType(schema[modelName], path.slice(1))
}