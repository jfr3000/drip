export default function (cycleDays, tempEvalEndIndex) {
  const mucusDays = cycleDays.filter(day => day.mucus && !day.mucus.exclude)
  const bestQuality = Math.max(...mucusDays.map(day => day.mucus.value))

  const mucusPeak = cycleDays.find((day, i) => {
    if (!mucusDays.includes(day) || day.mucus.value !== bestQuality) return false

    // sensiplan says the three following days must be of lower quality
    // AND no best quality day may occur until temperature evaluation has
    // been completed
    const mucusDaysIndex = mucusDays.indexOf(day)
    const threeFollowingDays = mucusDays.slice(mucusDaysIndex + 1, mucusDaysIndex + 4)
    if (threeFollowingDays.length < 3) return false

    const bestQualityOccurringIn3FollowingDays = threeFollowingDays.some(day => day.mucus.value >= bestQuality)
    if (bestQualityOccurringIn3FollowingDays) return false

    const relevantDays = cycleDays
      .slice(i + 1, tempEvalEndIndex + 1)
      .filter(day => day.mucus && !day.mucus.exclude)

    return relevantDays.every(day => day.mucus.value < bestQuality)
  })

  if (!mucusPeak) return { detected: false }

  return {
    detected: true,
    mucusPeak
  }
}

