import * as joda from 'js-joda'
import getLastMensesStart from './get-last-menses-start'

export default function config(opts = {}) {
  let bleedingDaysSortedByDate
  if (!opts.bleedingDaysSortedByDate) {
    // we only want to require (and run) the db module when not running the tests
    bleedingDaysSortedByDate = require('../db').bleedingDaysSortedByDate
  } else {
    bleedingDaysSortedByDate = opts.bleedingDaysSortedByDate
  }
  const maxBreakInBleeding = opts.maxBreakInBleeding || 1

  return function(targetDateString) {
    const lastMensesStart = getLastMensesStart(targetDateString, bleedingDaysSortedByDate, maxBreakInBleeding)
    if (!lastMensesStart) return null
    const targetDate = joda.LocalDate.parse(targetDateString)
    const diffInDays = lastMensesStart.wrappedDate.until(targetDate, joda.ChronoUnit.DAYS)

    // cycle starts at day 1
    return diffInDays + 1
  }
}