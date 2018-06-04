export default function (cycleDays, targetDay) {
  const lastFirstBleedingday = findLastFirstBleedingDay(cycleDays)

  if (!lastFirstBleedingday) return

  const diffInDays = targetDay.diff(lastFirstBleedingday.date, 'days')

  // cycle starts at day 1
  return diffInDays + 1
}

function findLastFirstBleedingDay(cycleDays) {
  // sort the cycle days in descending order
  // so we travel into the past as we iterate
  // over the array
  cycleDays.sort((a,b) => b.date - a.date)

  let sawBleeding = false

  for (let i = 0; i < cycleDays.length; i++) {
    const cycleDay = cycleDays[i]

    // we have detected the day before the beginning
    // of a bleeding period, so the previous cycle day in the array
    // was the first day of bleeding
    if (sawBleeding && (!isBleedingDay(cycleDay))) {
      return cycleDays[i - 1]
    }

    // if we get to the earliest cycle day and there was
    // bleeding on that day, it's the first bleeding day for us
    if (i === cycleDays.length - 1 && isBleedingDay(cycleDay)) {
      return cycleDay
    }

    if (isBleedingDay(cycleDay)) {
      sawBleeding = true
    }
  }
}

function isBleedingDay(cycleDay) {
  return cycleDay.bleeding
    && cycleDay.bleeding.value
    && !cycleDay.exclude
}