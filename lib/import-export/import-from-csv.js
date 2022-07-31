import csvParser from 'csvtojson'
import {
  getSchema,
  tryToImportWithDelete,
  tryToImportWithoutDelete,
  updateCycleStartsForAllCycleDays,
} from '../../db'
import getColumnNamesForCsv from './get-csv-column-names'
import replaceWithNullIfAllPropertiesAreNull from './replace-with-null'
import { LocalDate } from '@js-joda/core'
import labels from '../../i18n/en/settings'

export default async function importCsv(csv, deleteFirst) {
  const parseFuncs = {
    bool: (val) => {
      if (val.toLowerCase() === 'true') return true
      if (val.toLowerCase() === 'false') return false
      return val
    },
    int: parseNumberIfPossible,
    float: parseNumberIfPossible,
    double: parseNumberIfPossible,
    string: (val) => val,
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
      acc[colName] = (item) => {
        if (item === '') return null
        return parseFuncs[dbType](item)
      }
      return acc
    }, {}),
  }

  const cycleDays = await csvParser(config)
    .fromString(csv)
    .on('header', validateHeaders)

  //remove symptoms where all fields are null
  putNullForEmptySymptoms(cycleDays)
  throwIfFutureData(cycleDays)

  if (deleteFirst) {
    tryToImportWithDelete(cycleDays)
  } else {
    tryToImportWithoutDelete(cycleDays)
  }
  updateCycleStartsForAllCycleDays()
}

function validateHeaders(headers) {
  const expectedHeaders = getColumnNamesForCsv()
  if (
    !headers.every((header) => {
      return expectedHeaders.indexOf(header) > -1
    })
  ) {
    const msg = `Expected CSV column titles to be ${expectedHeaders.join()}`
    throw new Error(msg)
  }
}

function putNullForEmptySymptoms(data) {
  data.forEach(replaceWithNullIfAllPropertiesAreNull)
}

function getDbType(modelProperties, path) {
  const schema = getSchema()
  if (path.length === 1) return modelProperties[path[0]].type
  const modelName = modelProperties[path[0]].objectType
  return getDbType(schema[modelName], path.slice(1))
}

function throwIfFutureData(cycleDays) {
  const today = LocalDate.now().toString()
  for (const i in cycleDays) {
    const day = cycleDays[i]
    // notes are allowed for future dates but everything else isn't
    if (
      day.date > today &&
      Object.keys(day).some((symptom) => symptom != 'date' && symptom != 'note')
    ) {
      throw new Error(labels.import.errors.futureEdit)
    }
  }
}
