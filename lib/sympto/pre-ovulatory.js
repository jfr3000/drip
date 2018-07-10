import { LocalDate } from "js-joda"

export default function(cycle) {
  const startDate = LocalDate.parse(cycle[0].date)
  const fiveDayEndDate = startDate.plusDays(4).toString()
  const fiveDayRuleDays = cycle.slice(0, 5).filter(d => d.date <= fiveDayEndDate)
  const preOvulatoryDays = getDaysUntilFertileMucus(fiveDayRuleDays)
  let endDate
  if (preOvulatoryDays.length === fiveDayRuleDays.length) {
    endDate = fiveDayEndDate
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