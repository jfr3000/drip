import moment from 'moment'

export default function config(opts) {
  opts = opts || {
    // at the very minimum, a cycle can be a bleeding day
    // followed by a non-bleeding day, thus a length of 2
    minCycleLengthInDays: 2
  }

  return function getCycleDayNumber(unsorted, targetDate) {
    // sort the cycle days in descending order so we travel into
    // the past as we iterate over the array
    const cycleDays = [...unsorted].sort((a, b) => b.date.isAfter(a.date))

    const lastPeriodStart = cycleDays.find((day, i) => {
      if (
        isBleedingDay(day) &&
        thereIsNoPreviousBleedingDayWithinTheThreshold(day, cycleDays.slice(i + 1), opts.minCycleLengthInDays)) {
        return true
      }
    })

    if (!lastPeriodStart) return null

    // by default, moment.diff rounds down, so we get the decimal number
    // and round it ourselves
    const diffInDays = Math.round(targetDate.diff(lastPeriodStart.date, 'days', true))

    // cycle starts at day 1
    return diffInDays + 1
  }
}

function thereIsNoPreviousBleedingDayWithinTheThreshold(bleedingDay, earlierCycleDays, threshold) {
  // the bleeding day itself is included in the threshold, thus we subtract 1
  const minCycleThresholdDate = moment(bleedingDay.date).subtract(threshold - 1, 'days')
  return !earlierCycleDays.some(day => {
    return day.date.isSameOrAfter(minCycleThresholdDate, 'day') && isBleedingDay(day)
  })
}

function isBleedingDay(day) {
  return day.bleeding && day.bleeding.value && !day.bleeding.exclude
}