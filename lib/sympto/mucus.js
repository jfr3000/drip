export default function (cycleDays, tempEvalEndIndex) {
  const mucusDays = cycleDays.filter(day => day.mucus && !day.mucus.exclude)
  const bestQuality = Math.max(...mucusDays.map(day => day.mucus.value))

  for (let i = 0; i < mucusDays.length; i++) {
    const day = mucusDays[i]
    if (day.mucus.value !== bestQuality) continue

    // sensiplan says the three following days must be of lower quality
    // AND no best quality day may occur until temperature evaluation has
    // been completed
    const threeFollowingDays = mucusDays.slice(i + 1, i + 4)
    if (threeFollowingDays.length < 3) continue

    const bestQualityOccurringIn3FollowingDays = threeFollowingDays.some(day => day.mucus.value >= bestQuality)
    if (bestQualityOccurringIn3FollowingDays) continue

    // FIXME mucus peak can be same day as first higher measurement
    const cycleDayIndex = cycleDays.indexOf(day)
    const relevantDays = cycleDays
      .slice(cycleDayIndex + 1, tempEvalEndIndex + 1)
      .filter(day => day.mucus && !day.mucus.exclude)

    const evaluationCompleteDay = relevantDays.length > 3 ?
      relevantDays[relevantDays.length - 1] : threeFollowingDays[threeFollowingDays.length - 1]

    if (relevantDays.every(day => day.mucus.value < bestQuality)) {
      return {
        detected: true,
        mucusPeak: day,
        evaluationCompleteDay
      }
    }
  }

  return { detected: false }
}

