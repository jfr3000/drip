export default function(cycle) {
  const fiveDayRuleDays = cycle.slice(0, 5)
  const preOvulatoryDays = getDaysUntilFertileMucus(fiveDayRuleDays)
  return {
    cycleDays: preOvulatoryDays,
    start: {
      date: preOvulatoryDays[0].date
    },
    end: {
      date: preOvulatoryDays[preOvulatoryDays.length - 1].date,
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