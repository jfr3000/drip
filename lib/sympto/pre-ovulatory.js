import { LocalDate } from "js-joda"
import apply8DayRule from './minus-8-day-rule'

export default function(cycle, previousCycles) {
  let preOvuPhaseLength = 5

  const minus8DayRuleResult = apply8DayRule(previousCycles)
  if (minus8DayRuleResult) preOvuPhaseLength = minus8DayRuleResult

  const startDate = LocalDate.parse(cycle[0].date)
  const preOvuEndDate = startDate.plusDays(preOvuPhaseLength - 1).toString()
  const maybePreOvuDays = cycle.slice(0, preOvuPhaseLength).filter(d => {
    return d.date <= preOvuEndDate
  })
  const preOvulatoryDays = getDaysUntilFertileMucus(maybePreOvuDays)
  // if mucus occurs on the 1st cycle day, there is no pre-ovu phase
  if (!preOvulatoryDays.length) return null

  let endDate
  if (preOvulatoryDays.length === maybePreOvuDays.length) {
    endDate = preOvuEndDate
  } else {
    endDate = preOvulatoryDays[preOvulatoryDays.length - 1].date
  }

  return {
    cycleDays: preOvulatoryDays,
    start: {
      date: preOvulatoryDays[0].date
    },
    end: {
      date: endDate
    }
  }
}

function getDaysUntilFertileMucus(days) {
  const firstFertileMucusDayIndex = days.findIndex(day => {
    return day.mucus && day.mucus.value > 1
  })

  if (firstFertileMucusDayIndex > -1) {
    return days.slice(0, firstFertileMucusDayIndex)
  }
  return days
}