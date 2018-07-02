function detectTemperatureShift(temperaturesOfCycle) {
  // sensiplan rounds temps to the nearest 0.05
  const tempValues = temperaturesOfCycle.map(val => rounded(val, 0.05))

  function getLtl(i) {
    const sixTempsBefore = getSixTempsBefore(i)
    return Math.max(...sixTempsBefore)
  }
  function getSixTempsBefore(i) {
    return tempValues.slice(0, i).slice(-6)
  }

  return tempValues.reduce((acc, temp, i) => {
    // need at least 6 low temps before we can detect a first high measurement
    if (i < 6) return acc

    // if we've already detected a shift, we put it with the other high level temps
    if(acc.detected) {
      acc.high.push(temp)
      return acc
    }

    // is the temp a candidate for a first high measurement?
    const ltl = getLtl(i)
    if (temp <= ltl) return acc

    const checkResult = checkIfFirstHighMeasurement(temp, i, tempValues, ltl)
    // if we don't have a winner, keep going
    if (!checkResult.isFirstHighMeasurement) return acc

    // if we do, remember the details and start collecting the high level temps
    acc.detected = true
    acc.high = [temp]
    acc.rules = checkResult.rules
    acc.ltl = ltl
    acc.low = getSixTempsBefore(i)

    return acc
  }, {
    detected: false
  })
}

function rounded(val, step) {
  // we round the difference because of JS decimal weirdness
  const inverted = 1 / step
  return Math.round(val * inverted) / inverted
}

function checkIfFirstHighMeasurement(temp, i, temps, ltl) {
  // need at least 3 high temps to form a high temperature level
  if (i > temps.length - 3) {
    return { isFirstHighMeasurement: false }
  }
  const nextTemps = temps.slice(i + 1, i + 4)

  if (regularRuleApplies(temp, nextTemps, ltl)) {
    return {
      isFirstHighMeasurement: true,
      rules: {
        regular: true,
      },
      ltl
    }
  }

  if (firstExceptionRuleApplies(temp, nextTemps, ltl)) {
    return {
      isFirstHighMeasurement: true,
      rules: {
        firstException: true,
      },
      ltl
    }
  }

  if (secondExceptionRuleApplies(temp, nextTemps, ltl)) {
    return {
      isFirstHighMeasurement: true,
      rules: {
        secondException: true,
      },
      ltl
    }
  }

  return {
    isFirstHighMeasurement: false
  }
}

function regularRuleApplies(temp, nextTemps, ltl) {
  if (!nextTemps.every(temp => temp > ltl)) return false
  const thirdTemp = nextTemps[1]
  if (rounded(thirdTemp - ltl, 0.1) < 0.2) return false
  return true
}

function firstExceptionRuleApplies(temp, nextTemps, ltl) {
  if (nextTemps.length < 3) return false
  if (!nextTemps.every(temp => temp > ltl)) return false
  const fourthTemp = nextTemps[2]
  if (fourthTemp > ltl) return true
  return false
}

function secondExceptionRuleApplies(temp, nextTemps, ltl) {
  if (nextTemps.length < 3) return false
  if (secondOrThirdTempIsAtOrBelowLtl(nextTemps, ltl)) {
    const fourthTemp = nextTemps[2]
    if (rounded(fourthTemp - ltl, 0.1) >= 0.2) return true
  }
  return false
}

function secondOrThirdTempIsAtOrBelowLtl(nextTemps, ltl) {
  const secondIsLow = nextTemps[0] <= ltl
  const thirdIsLow = nextTemps[1] <= ltl
  if ((secondIsLow || thirdIsLow) && !(secondIsLow && thirdIsLow)) {
    return true
  } else {
    return false
  }
}

export {
  detectTemperatureShift
}