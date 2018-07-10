import { LocalDate } from "js-joda"

export default function(cycle) {
  const startDate = LocalDate.parse(cycle[0].date)
  const fiveDayEndDate = startDate.plusDays(4).toString()
  const fiveDayRuleDays = cycle.slice(0, 5).filter(d => d.date <= fiveDayEndDate)
  const preOvulatoryDays = getDaysUntilFertileMucus(fiveDayRuleDays)
  return {
    cycleDays: preOvulatoryDays,
    start: {
      date: preOvulatoryDays[0].date
    },
    end: {
      date: fiveDayEndDate
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