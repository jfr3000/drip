import * as joda from 'js-joda'
import {getCycleLengthStats} from './cycle-length'
const LocalDate = joda.LocalDate
const DAYS = joda.ChronoUnit.DAYS

export default function config(opts) {
  let bleedingDaysSortedByDate
  let cycleDaysSortedByDate
  let maxBreakInBleeding
  let maxCycleLength
  let minCyclesForPrediction

  if (!opts) {
    // we only want to require (and run) the db module
    // when not running the tests
    bleedingDaysSortedByDate = require('../db').getBleedingDaysSortedByDate()
    cycleDaysSortedByDate = require('../db').getCycleDaysSortedByDate()
    maxBreakInBleeding = 1
    maxCycleLength = 99
    minCyclesForPrediction = 3
  } else {
    bleedingDaysSortedByDate = opts.bleedingDaysSortedByDate || []
    cycleDaysSortedByDate = opts.cycleDaysSortedByDate || []
    maxBreakInBleeding = opts.maxBreakInBleeding || 1
    maxCycleLength = opts.maxCycleLength || 99
    minCyclesForPrediction = opts.minCyclesForPrediction || 3
  }

  function findLatestMensesStart(bleedingDays) {
    if (!bleedingDays.length) return null

    // assumes bleeding days are ordered latest first, and
    // excluded values already removed
    const lastMensesStart = bleedingDays.find((day, i) => {
      return noBleedingDayWithinThreshold(day, bleedingDays.slice(i + 1))
    })

    function noBleedingDayWithinThreshold(day, previousBleedingDays) {
      const localDate = LocalDate.parse(day.date)
      const threshold = localDate.minusDays(maxBreakInBleeding + 1).toString()
      return !previousBleedingDays.some(({ date }) => date >= threshold)
    }

    return lastMensesStart
  }

  function getLastMensesStartForDay(targetDateString) {
    // the index of the first bleeding day before the target day
    const index = bleedingDaysSortedByDate.findIndex(day => {
      return day.date <= targetDateString && !day.bleeding.exclude
    })

    if (index < 0) return null

    const prevBleedingDays = bleedingDaysSortedByDate.slice(index)
    return findLatestMensesStart(prevBleedingDays)
  }

  function getFollowingMensesStartForDay(targetDateString) {
    const followingBleedingDays = bleedingDaysSortedByDate
      .filter(day => !day.bleeding.exclude)
      .reverse()

    const firstBleedingDayAfterTargetDay = followingBleedingDays
      .find(day => day.date > targetDateString)

    return firstBleedingDayAfterTargetDay
  }

  function getCycleDayNumber(targetDateString) {
    const lastMensesStart = getLastMensesStartForDay(targetDateString)
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
    const startOfCycle = getLastMensesStartForDay(dateString)
    if (!startOfCycle) return null
    const dateBeforeStartOfCycle = LocalDate
      .parse(startOfCycle.date)
      .minusDays(1)
      .toString()

    return getCycleForDay(dateBeforeStartOfCycle)
  }

  function getCycleForDay(dayOrDate) {
    const dateString = typeof dayOrDate === 'string' ? dayOrDate : dayOrDate.date
    const cycleStart = getLastMensesStartForDay(dateString)
    if (!cycleStart) return null
    const cycleStartIndex = cycleDaysSortedByDate.indexOf(cycleStart)
    const nextMensesStart = getFollowingMensesStartForDay(dateString)
    if (nextMensesStart) {
      return cycleDaysSortedByDate.slice(
        cycleDaysSortedByDate.indexOf(nextMensesStart) + 1,
        cycleStartIndex + 1
      )
    } else {
      return cycleDaysSortedByDate.slice(0, cycleStartIndex + 1)
    }
  }

  function getAllMensesStarts(initialBleedingDays = bleedingDaysSortedByDate) {
    return recurse(initialBleedingDays.filter(d => !d.bleeding.exclude))

    function recurse(bleedingDays, collectedDates) {
      collectedDates = collectedDates || []
      const lastStart = findLatestMensesStart(bleedingDays)
      if (!lastStart) {
        return collectedDates
      } else {
        collectedDates.push(lastStart.date)
        const index = bleedingDays.indexOf(lastStart)
        const remainingDays = bleedingDays.slice(index + 1)
        return recurse(remainingDays, collectedDates)
      }
    }
  }

  function isMensesStart(cycleDay) {
    if (!cycleDay.bleeding || cycleDay.bleeding.exclude) return false
    if (noBleedingDayWithinThresholdBefore(cycleDay)) return true
    return false

    function noBleedingDayWithinThresholdBefore(cycleDay) {
      const localDate = LocalDate.parse(cycleDay.date)
      const threshold = localDate.minusDays(maxBreakInBleeding + 1).toString()
      const bleedingDays = bleedingDaysSortedByDate
      const index = bleedingDays.findIndex(day => day.date === cycleDay.date)
      const candidates = bleedingDays.slice(index + 1)
      return !candidates.some(day => {
        return day.date >= threshold && !day.bleeding.exclude
      })
    }
  }

  function getMensesDaysAfter(bleedingDay) {
    const bleedingDays = bleedingDaysSortedByDate.filter(d => {
      return !d.bleeding.exclude
    })
    const startIndex = bleedingDays.findIndex(day => {
      return day.date === bleedingDay.date
    })
    return recurse(bleedingDay, startIndex, [])

    function recurse(day, i, mensesDays) {
      if (i === 0) return mensesDays
      const next = bleedingDays[i - 1]
      if (!isWithinThreshold(day, next)) return mensesDays
      mensesDays.unshift(next)
      return recurse(next, i - 1, mensesDays)
    }

    function isWithinThreshold(cycleDay, nextCycleDay) {
      const localDate = LocalDate.parse(cycleDay.date)
      const threshold = localDate.plusDays(maxBreakInBleeding + 1).toString()
      return nextCycleDay.date <= threshold
    }
  }

  function getCycleLength(cycleStartDates) {
    const cycleLengths = []
    for (let i = 0; i < cycleStartDates.length - 1; i++) {
      const nextCycleStart = LocalDate.parse(cycleStartDates[i])
      const cycleStart = LocalDate.parse(cycleStartDates[i + 1])
      const cycleLength = cycleStart.until(nextCycleStart, DAYS)
      if (cycleLength <= maxCycleLength) { cycleLengths.push(cycleLength) }
    }
    return cycleLengths
  }

  function getPredictedMenses() {
    const allMensesStarts = getAllMensesStarts()
    const atLeastOneCycle = allMensesStarts.length > 1
    if (!atLeastOneCycle ||
      allMensesStarts.length < minCyclesForPrediction
    ) {
      return []
    }
    const cycleLengths = getCycleLength(allMensesStarts)
    const cycleInfo = getCycleLengthStats(cycleLengths)
    const periodDistance = Math.round(cycleInfo.mean)
    let periodStartVariation
    if (cycleInfo.stdDeviation === null) {
      periodStartVariation = 2
    } else if (cycleInfo.stdDeviation < 1.5) { // threshold is choosen a little arbitrarily
      periodStartVariation = 1
    } else {
      periodStartVariation = 2
    }
    if (periodDistance - 5 < periodStartVariation) { // otherwise predictions overlap
      return []
    }
    let lastStart = LocalDate.parse(allMensesStarts[0])
    const predictedMenses = []
    for (let i = 0; i < 3; i++) {
      lastStart = lastStart.plusDays(periodDistance)
      const nextPredictedDates = [lastStart.toString()]
      for (let j = 0; j < periodStartVariation; j++) {
        nextPredictedDates.push(lastStart.minusDays(j + 1).toString())
        nextPredictedDates.push(lastStart.plusDays(j + 1).toString())
      }
      nextPredictedDates.sort()
      predictedMenses.push(nextPredictedDates)
    }
    return predictedMenses
  }

  return {
    getCycleDayNumber,
    getCycleForDay,
    getPreviousCycle,
    getCyclesBefore,
    getAllMensesStarts,
    getCycleLength,
    getPredictedMenses,
    isMensesStart,
    getMensesDaysAfter
  }
}