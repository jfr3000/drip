export default function getPeriodLengthStats(cycleLengthArray) {
  if (Array.isArray(cycleLengthArray) && (cycleLengthArray.length > 0) && cycleLengthArray.every(cycleLength => {
    return (typeof cycleLength === 'number') && !(isNaN(cycleLength))
  })) {
    const PeriodLengthStats = {}
    const sortedCycleLegthArray = cycleLengthArray.sort((a, b) => {
      return a - b
    })
    PeriodLengthStats.minimum = sortedCycleLegthArray[0]
    PeriodLengthStats.maximum = sortedCycleLegthArray[cycleLengthArray.length - 1]
    PeriodLengthStats.mean = cycleLengthArray.reduce(getSum) / cycleLengthArray.length
    // median
    if (cycleLengthArray.length % 2 == 1) {
      PeriodLengthStats.median = sortedCycleLegthArray[(cycleLengthArray.length + 1) / 2 - 1]
    }
    else {
      const middle = cycleLengthArray.length / 2
      PeriodLengthStats.median = (sortedCycleLegthArray[middle - 1] + sortedCycleLegthArray[middle]) / 2
    }

    PeriodLengthStats.stdDeviation = 0 // default
    if (cycleLengthArray.length > 1) {
      const sumOfSquares = cycleLengthArray.map(cycleLength => {
        return Math.pow(cycleLength - PeriodLengthStats.mean, 2)
      }).reduce(getSum)
      PeriodLengthStats.stdDeviation = Math.sqrt(sumOfSquares / (cycleLengthArray.length - 1 ))
    }
    return PeriodLengthStats
  }
  console.error('getPeriodLengthStats requiers an array of numbers with length > 0.')
}

function getSum(total, num) {
  return total + num
}