export default function (cycleDays) {
  const mucusDays = cycleDays.filter(day => day.mucus && !day.mucus.exclude)
  const bestQuality = Math.max(...mucusDays.map(day => day.mucus.value))
  const mucusPeak = mucusDays.find((day, i) => {
    if (day.mucus.value !== bestQuality) return false

    const threeFollowingDays = mucusDays.slice(i + 1, i + 4)
    if (threeFollowingDays.length < 3) return false

    return threeFollowingDays.every(day => day.mucus.value < bestQuality)
  })

  if (!mucusPeak) return { detected: false }

  return {
    detected: true,
    mucusPeak
  }
}
