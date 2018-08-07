import objectPath from 'object-path'
import { Base64 } from 'js-base64'

import { getColumnNamesForCsv, cycleDaysSortedByDate } from '../db'

export default function makeDataURI() {
  if (!cycleDaysSortedByDate.length) return null

  const csv = transformToCsv(cycleDaysSortedByDate)
  const encoded = Base64.encodeURI(csv)
  // this is the MIME type android/libcore/MimeUtils expects, so we oblige
  return `data:text/comma-separated-values;base64,${encoded}`
}

function transformToCsv(cycleDays) {
  const columnNames = getColumnNamesForCsv()
  const rows = cycleDays
    .map(day => {
      return columnNames.map(column => {
        const val = objectPath.get(day, column)
        return typeof val === 'string' ? csvify(val) : val
      })
    })
    .map(row => row.join(','))

  rows.unshift(columnNames.join(','))
  return rows.join('\n')
}

function csvify (val) {
  // we wrap fields with special characters in quotes,
  // thus have to escape actual quotes
  val = val.replace(/"/g, '""')

  val = val.toLowerCase()
  const hasSpecialChars = (
    val.includes('\n') ||
    val.includes('\t') ||
    val.includes(',') ||
    val.includes(';') ||
    val.includes('.') ||
    val.includes('\'')
  )

  return hasSpecialChars ? `"${val}"` : val
}