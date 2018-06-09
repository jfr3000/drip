import * as joda from 'js-joda'

const LocalDate = joda.LocalDate

export default function config(bleedingDaysSortedByDateView, opts) {
  opts = opts || {
    // at the very minimum, a cycle can be a bleeding day
    // followed by a non-bleeding day, thus a length of 2
    maxBreakInBleeding: 1
  }

  return function getCycleDayNumber(targetDateString) {
    // sort the cycle days in descending order so we travel into
    // the past as we iterate over the array
    // also, to retrieve the number, we only need the cycle days before the target day
    const targetDate = LocalDate.parse(targetDateString)
    const withWrappedDates = bleedingDaysSortedByDateView
      .filter(day => !day.bleeding.exclude)
      .map(day => {
        day.wrappedDate = LocalDate.parse(day.date)
        return day
      })
    // TODO write test for what if there is no first day before?? aka no firstbleedingdaybeforeindex
    const firstBleedingDayBeforeTargetDayIndex = withWrappedDates.findIndex(day => day.wrappedDate.isBefore(targetDate))
    const cycleDays = withWrappedDates.slice(firstBleedingDayBeforeTargetDayIndex)

    const lastPeriodStart = cycleDays.find((day, i) => {
      return thereIsNoPreviousBleedingDayWithinTheThreshold(day, cycleDays.slice(i + 1), opts.maxBreakInBleeding)
    })

    if (!lastPeriodStart) return null

    const diffInDays = lastPeriodStart.wrappedDate.until(targetDate, joda.ChronoUnit.DAYS)

    // cycle starts at day 1
    return diffInDays + 1
  }
}

function thereIsNoPreviousBleedingDayWithinTheThreshold(bleedingDay, earlierCycleDays, allowedBleedingBreak) {
  const periodThreshold = bleedingDay.wrappedDate.minusDays(allowedBleedingBreak + 1)
  return !earlierCycleDays.some(({ wrappedDate }) => wrappedDate.equals(periodThreshold) || wrappedDate.isAfter(periodThreshold))
}