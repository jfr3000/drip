import * as joda from 'js-joda'

const LocalDate = joda.LocalDate

export default function config(opts) {
  let bleedingDaysSortedByDate
  let temperatureDaysSortedByDate
  let cycleDaysSortedByDate
  let maxBreakInBleeding

  if (!opts) {
    // we only want to require (and run) the db module
    // when not running the tests
    bleedingDaysSortedByDate = require('../db').bleedingDaysSortedByDate
    temperatureDaysSortedByDate = require('../db').temperatureDaysSortedByDate
    cycleDaysSortedByDate = require('../db').cycleDaysSortedByDate
    maxBreakInBleeding = 1
  } else {
    bleedingDaysSortedByDate = opts.bleedingDaysSortedByDate || []
    temperatureDaysSortedByDate = opts.temperatureDaysSortedByDate || []
    cycleDaysSortedByDate = opts.cycleDaysSortedByDate || []
    maxBreakInBleeding = opts.maxBreakInBleeding || 1
  }

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

    withWrappedDates.forEach(day => delete day.wrappedDate)
    return lastPeriodStart
  }

  function getCycleDayNumber(targetDateString) {
    const lastMensesStart = getLastMensesStart(targetDateString)
    if (!lastMensesStart) return null
    const targetDate = LocalDate.parse(targetDateString)
    const lastMensesLocalDate = LocalDate.parse(lastMensesStart.date)
    const diffInDays = lastMensesLocalDate.until(targetDate, joda.ChronoUnit.DAYS)

    // cycle starts at day 1
    return diffInDays + 1
  }

  function getPreviousTemperaturesInCycle(targetDateString, lastMensesStart) {
    const startIndex = temperatureDaysSortedByDate.findIndex(day => day.date <= targetDateString)
    const previousTemperaturesInCycle = temperatureDaysSortedByDate.slice(startIndex)
    const endIndex = previousTemperaturesInCycle.findIndex(day => day.date < lastMensesStart.date)
    return previousTemperaturesInCycle
      .slice(0, endIndex)
      .map(day => day.temperature.value)
  }

  function getCycleDaysBeforeDay(targetDateString) {
    const firstCycleDay = getLastMensesStart(targetDateString)
    if (!firstCycleDay) return null
    return cycleDaysSortedByDate.filter(({date}) => {
      return date >= firstCycleDay.date && date <= targetDateString
    })
  }

  function getPreviousCycles(targetCycleStartDay) {
    let previousCycleStartIndex = cycleDaysSortedByDate.indexOf(targetCycleStartDay)
    const cycles = []
    while (previousCycleStartIndex < cycleDaysSortedByDate.length - 1) {
      const prevDate = cycleDaysSortedByDate[previousCycleStartIndex + 1].date
      const cycleStart = getLastMensesStart(prevDate)

      if (!cycleStart) break

      const cycleStartIndex = cycleDaysSortedByDate.indexOf(cycleStart)
      const lastDayInCycle = previousCycleStartIndex + 1
      const cycle = cycleDaysSortedByDate.slice(lastDayInCycle, cycleStartIndex + 1)
      cycles.push(cycle)
      previousCycleStartIndex = cycleStartIndex
    }

    return cycles
  }

  return {
    getCycleDayNumber,
    getLastMensesStart,
    getPreviousTemperaturesInCycle,
    getCycleDaysBeforeDay,
    getPreviousCycles
  }
}
