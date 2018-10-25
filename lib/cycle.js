import * as joda from 'js-joda'
import {getCycleLengthStats} from './cycle-length'
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

    // cycle starts at day 1
    return diffInDays + 1
  }

  function getPreviousCycle(dateString) {
    const cycleStart = getLastMensesStartForDay(dateString)
    if (!cycleStart) return null
    const i = cycleStartsSortedByDate.indexOf(cycleStart)
    const earlierCycleStart = cycleStartsSortedByDate[i + 1]
    if (!earlierCycleStart) return null
    return getCycleForStartDay(earlierCycleStart)
  }

  function getCyclesBefore(targetCycleStartDay) {
    const startFromHere = cycleStartsSortedByDate.findIndex(start => {
      return start.date < targetCycleStartDay.date
    })
    if (startFromHere < 0) return null
    return cycleStartsSortedByDate
      .slice(startFromHere)
      .map(getCycleForStartDay)
  }

  function getCycleForStartDay(startDay) {
    const cycleStartIndex = cycleDaysSortedByDate.indexOf(startDay)
    const i = cycleStartsSortedByDate.indexOf(startDay)
    const nextMensesStart = cycleStartsSortedByDate[i - 1]
    if (nextMensesStart) {
      return cycleDaysSortedByDate.slice(
        cycleDaysSortedByDate.indexOf(nextMensesStart) + 1,
        cycleStartIndex + 1,
      )
    } else {
      return cycleDaysSortedByDate.slice(0, cycleStartIndex + 1)
    }
  }

  function getCycleForDay(dayOrDate) {
    const dateString = typeof dayOrDate === 'string' ? dayOrDate : dayOrDate.date
    const cycleStart = getLastMensesStartForDay(dateString)
    if (!cycleStart) return null
    return getCycleForStartDay(cycleStart)
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

  function getMensesDaysAfter(cycleDay) {
    const bleedingDays = bleedingDaysSortedByDate.filter(d => {
      return !d.bleeding.exclude
    })
    const startIndex = bleedingDays.findIndex(day => {
      return day.date === cycleDay.date
    })
    return recurse(cycleDay, startIndex, [])

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

  function getAllCycleLengths() {
    return cycleStartsSortedByDate
      .map(day => LocalDate.parse(day.date))
      .reduce((lengths, cycleStart, i, startsAsLocalDates) => {
        if (i === startsAsLocalDates.length - 1) return lengths
        const prevCycleStart = startsAsLocalDates[i + 1]
        const cycleLength = prevCycleStart.until(cycleStart, DAYS)
        if (cycleLength <= maxCycleLength) { lengths.push(cycleLength) }
        return lengths
      }, [])
  }

  function getPredictedMenses() {
    const allMensesStarts = cycleStartsSortedByDate
    const atLeastOneCycle = allMensesStarts.length > 1
    if (!atLeastOneCycle ||
      allMensesStarts.length < minCyclesForPrediction
    ) {
      return []
    }
    const cycleLengths = getAllCycleLengths()
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
    getMensesDaysAfter
  }
}