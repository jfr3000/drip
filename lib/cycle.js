import * as joda from 'js-joda'

const LocalDate = joda.LocalDate

export default function config(opts = {}) {
  let bleedingDaysSortedByDate
  if (!opts.bleedingDaysSortedByDate) {
    // we only want to require (and run) the db module when not running the tests
    bleedingDaysSortedByDate = require('../db').bleedingDaysSortedByDate
  } else {
    bleedingDaysSortedByDate = opts.bleedingDaysSortedByDate
  }
  const maxBreakInBleeding = opts.maxBreakInBleeding || 1

  function getLastMensesStart(targetDateString) {
    const targetDate = LocalDate.parse(targetDateString)
    const withWrappedDates = bleedingDaysSortedByDate
      .filter(day => !day.bleeding.exclude)
      .map(day => {
        day.wrappedDate = LocalDate.parse(day.date)
        return day
      })

    const firstBleedingDayBeforeTargetDayIndex = withWrappedDates.findIndex(day => {
      return (
        day.wrappedDate.isEqual(targetDate) ||
        day.wrappedDate.isBefore(targetDate)
      )
    })

    if (firstBleedingDayBeforeTargetDayIndex < 0) return null
    const previousBleedingDays = withWrappedDates.slice(firstBleedingDayBeforeTargetDayIndex)

    const lastPeriodStart = previousBleedingDays.find((day, i) => {
      return thereIsNoPreviousBleedingDayWithinTheThreshold(day, previousBleedingDays.slice(i + 1))
    })

    function thereIsNoPreviousBleedingDayWithinTheThreshold(bleedingDay, previousBleedingDays) {
      const periodThreshold = bleedingDay.wrappedDate.minusDays(maxBreakInBleeding + 1)
      return !previousBleedingDays.some(({ wrappedDate }) => wrappedDate.equals(periodThreshold) || wrappedDate.isAfter(periodThreshold))
    }

    return lastPeriodStart
  }

  function getCycleDayNumber(targetDateString) {
    const lastMensesStart = getLastMensesStart(targetDateString)
    if (!lastMensesStart) return null
    const targetDate = joda.LocalDate.parse(targetDateString)
    const diffInDays = lastMensesStart.wrappedDate.until(targetDate, joda.ChronoUnit.DAYS)

    // cycle starts at day 1
    return diffInDays + 1
  }

  function getPreviousDaysInCycle() {
    return []
  }

  return {
    getCycleDayNumber,
    getLastMensesStart,
    getPreviousDaysInCycle
  }
}
