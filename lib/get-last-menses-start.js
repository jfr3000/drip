import * as joda from 'js-joda'

const LocalDate = joda.LocalDate

export default function getLastMensesStart(targetDateString, bleedingDaysSortedByDate, maxBreakInBleeding) {
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
    return thereIsNoPreviousBleedingDayWithinTheThreshold(day, previousBleedingDays.slice(i + 1), maxBreakInBleeding)
  })

  return lastPeriodStart
}

function thereIsNoPreviousBleedingDayWithinTheThreshold(bleedingDay, earlierCycleDays, allowedBleedingBreak) {
  const periodThreshold = bleedingDay.wrappedDate.minusDays(allowedBleedingBreak + 1)
  return !earlierCycleDays.some(({ wrappedDate }) => wrappedDate.equals(periodThreshold) || wrappedDate.isAfter(periodThreshold))
}