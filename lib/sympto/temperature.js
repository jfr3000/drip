export default function (cycleDays) {
  const temperatureDays = cycleDays
    .filter(day => day.temperature && !day.temperature.exclude)
    .map(day => {
      return {
        originalCycleDay: day,
        temp: rounded(day.temperature.value, 0.05)
      }
    })

  function getLtl(i) {
    const daysBefore = temperatureDays.slice(0, i).slice(-6)
    const temps = daysBefore.map(day => day.temp)
    return Math.max(...temps)
  }

  for (let i = 0; i < temperatureDays.length; i++) {
    // need at least 6 low temps before we can detect a first high measurement
    if (i < 6) continue

    // is the temp a candidate for a first high measurement?
    const ltl = getLtl(i)
    const temp = temperatureDays[i].temp
    if (temp <= ltl) continue

    const checkResult = checkIfFirstHighMeasurement(temp, i, temperatureDays, ltl)

    if (checkResult.detected) {
      checkResult.firstHighMeasurementDay = temperatureDays[i].originalCycleDay
      return checkResult
    }
  }

  return { detected: false }
}

function checkIfFirstHighMeasurement(temp, i, temperatureDays, ltl) {
  // need at least 3 high temps to form a high temperature level
  if (i > temperatureDays.length - 3) {
    return { detected: false }
  }
  const nextDays = temperatureDays.slice(i + 1, i + 4)

  return (
    getResultForRegularRule(nextDays, ltl)) ||
    getResultForFirstExceptionRule(nextDays, ltl) ||
    getResultForSecondExceptionRule(nextDays, ltl) ||
    { detected: false }
}

function getResultForRegularRule(nextDays, ltl) {
  if (!nextDays.every(day => day.temp > ltl)) return false
  const thirdDay = nextDays[1]
  if (rounded(thirdDay.temp - ltl, 0.1) < 0.2) return false
  return {
    detected: true,
    rule: 0,
    ltl,
    evaluationCompleteDay: thirdDay.originalCycleDay
  }
}

function getResultForFirstExceptionRule(nextDays, ltl) {
  if (nextDays.length < 3) return false
  if (!nextDays.every(day => day.temp > ltl)) return false
  const fourthDay = nextDays[2]
  if (fourthDay.temp <= ltl) return false
  return {
    detected: true,
    rule: 1,
    ltl,
    evaluationCompleteDay: fourthDay.originalCycleDay
  }
}

function getResultForSecondExceptionRule(nextDays, ltl) {
  if (nextDays.length < 3) return false
  if (secondOrThirdTempIsAtOrBelowLtl(nextDays, ltl)) {
    const fourthDay = nextDays[2]
    if (rounded(fourthDay.temp - ltl, 0.1) >= 0.2) {
      return {
        detected: true,
        rule: 2,
        ltl,
        evaluationCompleteDay: fourthDay.originalCycleDay
      }
    }
  }
  return false
}

function secondOrThirdTempIsAtOrBelowLtl(nextDays, ltl) {
  const secondIsLow = nextDays[0].temp <= ltl
  const thirdIsLow = nextDays[1].temp <= ltl
  if ((secondIsLow || thirdIsLow) && !(secondIsLow && thirdIsLow)) {
    return true
  } else {
    return false
  }
}

function rounded(val, step) {
  const inverted = 1 / step
  // we round the difference because of JS decimal weirdness
  return Math.round(val * inverted) / inverted
}
