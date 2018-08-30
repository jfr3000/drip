export default function (cycleDays, tempEvalEndIndex) {
  const cervixDays = cycleDays.filter(day => day.cervix && !day.cervix.exclude)

  for (let i = 0; i < cervixDays.length; i++) {
    const day = cervixDays[i]
    if (isClosedAndHard(day.cervix)) continue
    // the three following days must be with closed and hard cervix
    // AND no other cervix value may occur until temperature evaluation has
    // been completed
    const threeFollowingDays = cervixDays.slice(i + 1, i + 4)
    if (threeFollowingDays.length < 3) continue

    const fertileCervixOccursIn3FollowingDays = threeFollowingDays.some(day => {
      return !isClosedAndHard(day.cervix)
    })
    if (fertileCervixOccursIn3FollowingDays) continue

    const cycleDayIndex = cycleDays.indexOf(day)
    const relevantDays = cycleDays
      .slice(cycleDayIndex + 1, tempEvalEndIndex + 1)
      .filter(day => day.cervix && !day.cervix.exclude)

    const onlyClosedAndHardUntilEndOfTempEval = relevantDays.every(day => {
      return isClosedAndHard(day.cervix)
    })

    if (onlyClosedAndHardUntilEndOfTempEval) {
      return {
        detected: true,
        cervixPeak: day,
        evaluationCompleteDay: threeFollowingDays[threeFollowingDays.length - 1]
      }
    }
  }

  return { detected: false }
}

function isClosedAndHard (cervixValue) {
  return cervixValue.isClosed && cervixValue.isHard
}
