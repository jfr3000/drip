import assert from 'assert'

export default function getPeriodLengthStats(cycleLengths) {
  throwIfArgsAreNotInRequiredFormat(cycleLengths)
  const periodLengthStats = {}
  const sortedCycleLengths = cycleLengths.sort((a, b) => {
    return a - b
  })
  periodLengthStats.minimum = sortedCycleLengths[0]
  periodLengthStats.maximum = sortedCycleLengths[cycleLengths.length - 1]
  periodLengthStats.mean = Math.round(
    cycleLengths.reduce(getSum) / cycleLengths.length * 100) / 100
  // median
  if (cycleLengths.length % 2 == 1) {
    periodLengthStats.median = sortedCycleLengths[(cycleLengths.length + 1) /
       2 - 1]
  }
  else {
    const middle = cycleLengths.length / 2
    periodLengthStats.median = (sortedCycleLengths[middle - 1] +
       sortedCycleLengths[middle]) / 2
  }
  // corrected standard deviation (based on unbiased sample variance)
  periodLengthStats.stdDeviation = null // for case t
  if (cycleLengths.length > 1) {
    const sumOfSquares = cycleLengths.map(cycleLength => {
      return Math.pow(cycleLength - periodLengthStats.mean, 2)
    }).reduce(getSum)
    periodLengthStats.stdDeviation = Math.round(
      Math.sqrt(sumOfSquares / (cycleLengths.length - 1 )) * 100) / 100
  }
  return periodLengthStats
}

function getSum(total, num) {
  return total + num
}

function throwIfArgsAreNotInRequiredFormat(cycleLengths) {
  assert.ok(Array.isArray(cycleLengths), 'Function requires input to be an array.')
  assert.ok(cycleLengths.length > 0, 'Input array should not be empty.')
  cycleLengths.forEach(cycleLength => {
    assert.equal(typeof cycleLength, 'number', 'Elements in the array should be of type number.')
    assert.ok(!isNaN(cycleLength), 'Elements of Array should not be NaN.')
  })
}