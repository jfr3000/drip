import { LocalDate } from "js-joda"

export default function(cycle, previousCycles) {
  // TODO handle no previous cycles
  let preOvuPhaseLength = 5

  //TODO make sure it handles weird cases like fhm < 9
  const minus8DayRuleResult = apply8DayRule(previousCycles)
  if (minus8DayRuleResult) preOvuPhaseLength = minus8DayRuleResult

  const startDate = LocalDate.parse(cycle[0].date)
  const preOvuPhaseEndDate = startDate.plusDays(preOvuPhaseLength - 1).toString()
  const maybePreOvuDays = cycle.slice(0, 5).filter(d => d.date <= preOvuPhaseEndDate)
  const preOvulatoryDays = getDaysUntilFertileMucus(maybePreOvuDays)
  let endDate
  if (preOvulatoryDays.length === maybePreOvuDays.length) {
    endDate = preOvuPhaseEndDate
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
  const firstFertileMucusDayIndex = days.findIndex(day => day.mucus && day.mucus.value > 1)
  if (firstFertileMucusDayIndex > -1) {
    return days.slice(0, firstFertileMucusDayIndex)
  }
  return days
}

function apply8DayRule(previousCycles) {}