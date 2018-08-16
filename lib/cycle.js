import * as joda from 'js-joda'
const LocalDate = joda.LocalDate
const DAYS = joda.ChronoUnit.DAYS

export default function config(opts) {
  let bleedingDaysSortedByDate
  let cycleDaysSortedByDate
  let maxBreakInBleeding

  if (!opts) {
    // we only want to require (and run) the db module
    // when not running the tests
    bleedingDaysSortedByDate = require('../db').bleedingDaysSortedByDate
    cycleDaysSortedByDate = require('../db').cycleDaysSortedByDate
    maxBreakInBleeding = 1
  } else {
    bleedingDaysSortedByDate = opts.bleedingDaysSortedByDate || []
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

    // the index of the first bleeding day before the target day
    const index = withWrappedDates.findIndex(day => {
      return (
        day.wrappedDate.isEqual(targetDate) ||
        day.wrappedDate.isBefore(targetDate)
      )
    })

    if (index < 0) {
      withWrappedDates.forEach(day => delete day.wrappedDate)
      return null
    }

    const prevBleedingDays = withWrappedDates.slice(index)

    const lastMensesStart = prevBleedingDays.find((day, i) => {
      return noBleedingDayWithinThreshold(day, prevBleedingDays.slice(i + 1))
    })

    function noBleedingDayWithinThreshold(day, previousBleedingDays) {
      const periodThreshold = day.wrappedDate.minusDays(maxBreakInBleeding + 1)
      return !previousBleedingDays.some(({ wrappedDate }) => {
        return (
          wrappedDate.equals(periodThreshold) ||
          wrappedDate.isAfter(periodThreshold)
        )
      })
    }

    withWrappedDates.forEach(day => delete day.wrappedDate)
    return lastMensesStart
  }

  function getFollowingMensesStart(targetDateString) {
    const targetDate = LocalDate.parse(targetDateString)
    const withWrappedDates = bleedingDaysSortedByDate
      .filter(day => !day.bleeding.exclude)
      .map(day => {
        day.wrappedDate = LocalDate.parse(day.date)
        return day
      })

    const firstBleedingDayAfterTargetDay = withWrappedDates
      .reverse()
      .find(day => {
        return day.wrappedDate.isAfter(targetDate)
      })

    withWrappedDates.forEach(day => delete day.wrappedDate)

    return firstBleedingDayAfterTargetDay
  }

  function getCycleDayNumber(targetDateString) {
    const lastMensesStart = getLastMensesStart(targetDateString)
    if (!lastMensesStart) return null
    const targetDate = LocalDate.parse(targetDateString)
    const lastMensesLocalDate = LocalDate.parse(lastMensesStart.date)
    const diffInDays = lastMensesLocalDate.until(targetDate, DAYS)

    // cycle starts at day 1
    return diffInDays + 1
  }

  function getCyclesBefore(targetCycleStartDay) {
    return collectPreviousCycles([], targetCycleStartDay.date)
  }

  function collectPreviousCycles(acc, startOfFollowingCycle) {
    const cycle = getPreviousCycle(startOfFollowingCycle)
    if (!cycle || !cycle.length) return acc
    acc.push(cycle)
    return collectPreviousCycles(acc, cycle[cycle.length - 1].date)
  }

  function getPreviousCycle(dateString) {
    const startOfCycle = getLastMensesStart(dateString)
    if (!startOfCycle) return null
    const dateBeforeStartOfCycle = LocalDate
      .parse(startOfCycle.date)
      .minusDays(1)
      .toString()

    return getCycleForDay(dateBeforeStartOfCycle)
  }

  function getCycleForDay(dayOrDate) {
    const dateString = typeof dayOrDate === 'string' ? dayOrDate : dayOrDate.date
    const cycleStart = getLastMensesStart(dateString)
    if (!cycleStart) return null
    const cycleStartIndex = cycleDaysSortedByDate.indexOf(cycleStart)
    const nextMensesStart = getFollowingMensesStart(dateString)
    if (nextMensesStart) {
      return cycleDaysSortedByDate.slice(
        cycleDaysSortedByDate.indexOf(nextMensesStart) + 1,
        cycleStartIndex + 1
      )
    } else {
      return cycleDaysSortedByDate.slice(0, cycleStartIndex + 1)
    }
  }

  function getAllMensesStarts(day, collectedDates) {
    day = day || LocalDate.now().toString()
    collectedDates = collectedDates || []
    const lastStart = getLastMensesStart(day)
    if (!lastStart) {
      return collectedDates
    } else {
      const newDay = LocalDate.parse(lastStart.date).minusDays(1).toString()
      collectedDates.push(lastStart.date)
      return getAllMensesStarts(newDay, collectedDates)
    }
  }

  return {
    getCycleDayNumber,
    getCycleForDay,
    getPreviousCycle,
    getCyclesBefore,
    getAllMensesStarts
  }
}