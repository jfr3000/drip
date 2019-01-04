import * as joda from 'js-joda'
import { getCycleLengthStats } from './cycle-length'
const LocalDate = joda.LocalDate
const DAYS = joda.ChronoUnit.DAYS

export default function config(opts) {
  let bleedingDaysSortedByDate
  let cycleStartsSortedByDate
  let cycleDaysSortedByDate
  let maxBreakInBleeding
  let maxCycleLength
  let minCyclesForPrediction

  if (!opts) {
    // we only want to require (and run) the db module
    // when not running the tests
    bleedingDaysSortedByDate = require('../db').getBleedingDaysSortedByDate()
    cycleStartsSortedByDate = require('../db').getCycleStartsSortedByDate()
    cycleDaysSortedByDate = require('../db').getCycleDaysSortedByDate()
    maxBreakInBleeding = 1
    maxCycleLength = 99
    minCyclesForPrediction = 3
  } else {
    bleedingDaysSortedByDate = opts.bleedingDaysSortedByDate || []
    cycleStartsSortedByDate = opts.cycleStartsSortedByDate || []
    cycleDaysSortedByDate = opts.cycleDaysSortedByDate || []
    maxBreakInBleeding = opts.maxBreakInBleeding || 1
    maxCycleLength = opts.maxCycleLength || 99
    minCyclesForPrediction = opts.minCyclesForPrediction || 3
  }

  function getLastMensesStartForDay(targetDateString) {
    return cycleStartsSortedByDate.find(start => start.date <= targetDateString)
  }

  function getCycleDayNumber(targetDateString) {
    const lastMensesStart = getLastMensesStartForDay(targetDateString)
    if (!lastMensesStart) return null
    const targetDate = LocalDate.parse(targetDateString)
    const lastMensesLocalDate = LocalDate.parse(lastMensesStart.date)
    const diffInDays = lastMensesLocalDate.until(targetDate, DAYS)
    // take maxCycleLength into account (we don't display cycle day numbers higher than 99 at the moment)
    if (diffInDays >= maxCycleLength) return null
    // cycle starts at day 1
    return diffInDays + 1
  }

  function getPreviousCycle(dateString) {
    const cycleStart = getLastMensesStartForDay(dateString)
    if (!cycleStart) return null
    const i = cycleStartsSortedByDate.indexOf(cycleStart)
    const earlierCycleStart = cycleStartsSortedByDate[i + 1]
    if (!earlierCycleStart) return null
    return getCycleForCycleStartDay(earlierCycleStart)
  }

  function getCyclesBefore(targetCycleStartDay) {
    const startFromHere = cycleStartsSortedByDate.findIndex(start => {
      return start.date < targetCycleStartDay.date
    })
    if (startFromHere < 0) return null
    return cycleStartsSortedByDate
      .slice(startFromHere)
      .map(start => getCycleForCycleStartDay(start))
      // filter the ones exceeding maxCycleLength, those are null
      .filter(cycle => cycle)
  }

  function getCycleForCycleStartDay(startDay, todayDate) {
    const todayAsLocalDate = todayDate ? LocalDate.parse(todayDate) : LocalDate.now()
    const cycleStartIndex = cycleDaysSortedByDate.indexOf(startDay)
    const i = cycleStartsSortedByDate.indexOf(startDay)
    const startLocalDate = LocalDate.parse(startDay.date)
    const nextMensesStart = cycleStartsSortedByDate[i - 1]
    let cycle
    let cycleLength
    if (nextMensesStart) {
      cycle = cycleDaysSortedByDate.slice(
        cycleDaysSortedByDate.indexOf(nextMensesStart) + 1,
        cycleStartIndex + 1,
      )
      const nextLocalDate = LocalDate.parse(nextMensesStart.date)
      cycleLength = startLocalDate.until(nextLocalDate, DAYS)
    } else {
      cycle = cycleDaysSortedByDate.slice(0, cycleStartIndex + 1)
      cycleLength = startLocalDate.until(todayAsLocalDate, DAYS)
    }
    return cycleLength > maxCycleLength ? null : cycle
  }

  function getCycleForDay(dayOrDate, todayDate) {
    const dateString = typeof dayOrDate === 'string' ? dayOrDate : dayOrDate.date
    const cycleStart = getLastMensesStartForDay(dateString)
    if (!cycleStart) return null
    return getCycleForCycleStartDay(cycleStart, todayDate)
  }

  function isMensesStart(cycleDay) {
    if (!cycleDay.bleeding || cycleDay.bleeding.exclude) return false
    if (noBleedingDayWithinThresholdBefore(cycleDay)) return true
    return false

    // checks that there are no relevant bleeding days before
    // the input cycleDay (returns boolean)
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

  // returns all bleeding days that belong to one menses directly following
  // the cycle day. used to set or clear new cycle starts when the target day
  // changes
  function getMensesDaysRightAfter(cycleDay) {
    const bleedingDays = bleedingDaysSortedByDate
      .filter(d => !d.bleeding.exclude)
      .reverse()
    const firstFollowingBleedingDayIndex = bleedingDays.findIndex(day => {
      return day.date > cycleDay.date
    })
    return recurse(cycleDay, firstFollowingBleedingDayIndex, [])

    // we look at the current bleeding day as well as the next, and decide
    // whether they belong to one menses. if they do, we collect them, once
    // they don't, we're done
    function recurse(day, nextIndex, mensesDays) {
      const next = bleedingDays[nextIndex]
      if (!next) return mensesDays
      if (!isWithinThreshold(day, next)) return mensesDays
      mensesDays.unshift(next)
      return recurse(next, nextIndex + 1, mensesDays)
    }

    // checks whether the two days belong to one menses episode
    function isWithinThreshold(bleedingDay, nextBleedingDay) {
      const localDate = LocalDate.parse(bleedingDay.date)
      const threshold = localDate.plusDays(maxBreakInBleeding + 1).toString()
      return nextBleedingDay.date <= threshold
    }
  }

  function getAllCycleLengths() {
    return cycleStartsSortedByDate
      .map(day => LocalDate.parse(day.date))
      .map((cycleStart, i, startsAsLocalDates) => {
        if (i === cycleStartsSortedByDate.length - 1) return null
        const prevCycleStart = startsAsLocalDates[i + 1]
        return prevCycleStart.until(cycleStart, DAYS)
      })
      .filter(length => length && length <= maxCycleLength)
  }

  function getPredictedMenses() {
    const cycleLengths = getAllCycleLengths()
    if (cycleLengths.length < minCyclesForPrediction) {
      return []
    }
    const cycleInfo = getCycleLengthStats(cycleLengths)
    const periodDistance = Math.round(cycleInfo.mean)
    let periodStartVariation
    if (cycleInfo.stdDeviation === null) {
      periodStartVariation = 2
    } else if (cycleInfo.stdDeviation < 1.5) { // threshold is chosen a little arbitrarily
      periodStartVariation = 1
    } else {
      periodStartVariation = 2
    }
    if (periodDistance - 5 < periodStartVariation) { // otherwise predictions overlap
      return []
    }
    const allMensesStarts = cycleStartsSortedByDate
    let lastStart = LocalDate.parse(allMensesStarts[0].date)
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
    getAllCycleLengths,
    getPredictedMenses,
    isMensesStart,
    getMensesDaysRightAfter
  }
}