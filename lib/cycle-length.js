import assert from 'assert'
import { LocalDate, ChronoUnit } from 'js-joda'
import cycleModule from '../lib/cycle'

export function getCycleLengthStats(cycleLengths) {
  throwIfArgsAreNotInRequiredFormat(cycleLengths)
  const cycleLengthStats = {}
  const sortedCycleLengths = cycleLengths.sort((a, b) => {
    return a - b
  })
  cycleLengthStats.minimum = sortedCycleLengths[0]
  cycleLengthStats.maximum = sortedCycleLengths[cycleLengths.length - 1]
  cycleLengthStats.mean = Math.round(
    cycleLengths.reduce(getSum) / cycleLengths.length * 100
  ) / 100
  // median
  if (cycleLengths.length % 2 == 1) {
    cycleLengthStats.median = sortedCycleLengths[
      (cycleLengths.length + 1) / 2 - 1
    ]
  } else {
    const middle = cycleLengths.length / 2
    cycleLengthStats.median = (sortedCycleLengths[middle - 1] +
       sortedCycleLengths[middle]) / 2
  }
  // corrected standard deviation (based on unbiased sample variance)
  if (cycleLengths.length > 1) {
    const sumOfSquares = cycleLengths.map(cycleLength => {
      return Math.pow(cycleLength - cycleLengthStats.mean, 2)
    }).reduce(getSum)
    cycleLengthStats.stdDeviation = Math.round(
      Math.sqrt(sumOfSquares / (cycleLengths.length - 1 )) * 100
    ) / 100
  } else {
    cycleLengthStats.stdDeviation = null
  }
  return cycleLengthStats
}

function getSum(total, num) {
  return total + num
}

function throwIfArgsAreNotInRequiredFormat(cycleLengths) {
  assert.ok(Array.isArray(cycleLengths), 'Input should be an array.')
  assert.ok(cycleLengths.length > 0, 'Input array should not be empty.')
  cycleLengths.forEach(cycleLength => {
    assert.equal(typeof cycleLength, 'number', 'Elements in the array should be of type number.')
    assert.ok(!isNaN(cycleLength), 'Elements of array should not be NaN.')
  })
}

export function getCycleLength(cycleStartDates) {
  const cycleLengths = []
  for (let i = 0; i < cycleStartDates.length - 1; i++) {
    const nextCycleStart = LocalDate.parse(cycleStartDates[i])
    const cycleStart = LocalDate.parse(cycleStartDates[i + 1])
    cycleLengths.push(cycleStart.until(nextCycleStart, ChronoUnit.DAYS))
  }
  return cycleLengths
}