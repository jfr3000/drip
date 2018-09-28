export default function (cycleDays, tempEvalEndIndex) {
  const notDetected = { detected: false}
  const mucusDays = cycleDays.filter(day => day.mucus && !day.mucus.exclude)
  let currentBestQuality = 0

  for (let i = 0; i < mucusDays.length; i++) {
    const day = mucusDays[i]

    if (day.mucus.value > currentBestQuality) {
      currentBestQuality = day.mucus.value
    }

    // if mucus only changes from dry to nothing, it doesn't constitute a shift
    if (currentBestQuality < 2) continue

    if (day.mucus.value !== currentBestQuality) continue

    // the three following days must be of lower quality
    const threeFollowingDays = mucusDays.slice(i + 1, i + 4)
    if (threeFollowingDays.length < 3) continue

    const bestQualityOccursIn3FollowingDays = threeFollowingDays.some(day => {
      return day.mucus.value >= currentBestQuality
    })
    if (bestQualityOccursIn3FollowingDays) continue

    const cycleDayIndex = cycleDays.indexOf(day)

    // if temperature evaluation has been completed an we still haven't found
    // a candidate, there is no cervix shift
    if (cycleDayIndex > tempEvalEndIndex) return notDetected

    // no best quality day may occur until temperature evaluation has
    // been completed
    const relevantDays = cycleDays
      .slice(cycleDayIndex + 1, tempEvalEndIndex + 1)
      .filter(day => day.mucus && !day.mucus.exclude)

    const noBestQualityUntilEndOfTempEval = relevantDays.every(day => {
      return day.mucus.value < currentBestQuality
    })

    if (noBestQualityUntilEndOfTempEval) {
      return {
        detected: true,
        mucusPeak: day,
        evaluationCompleteDay: threeFollowingDays[threeFollowingDays.length - 1]
      }
    }
  }

  return notDetected
}

