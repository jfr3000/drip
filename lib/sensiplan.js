function detectTemperatureShift(temperaturesOfCycle) {
  // sensiplan rounds temps to the nearest 0.05
  const tempValues = temperaturesOfCycle.map(val => rounded(val, 0.05))

  return tempValues.reduce((acc, curr) => {
    // if we don't yet have 6 lower temps, we just collect
    // if no shift has been detected, we collect low temps
    // after the shift has been detected, we count them as part
    // of the higher temperature phase
    if (acc.low.length < 6) {
      acc.low.push(curr)
      acc.ltl = Math.max(...acc.low)
      // TODO these are the same
    } else if (curr <= acc.ltl && !acc.potentialHigh && !acc.shiftDetected) {
      acc.low.push(curr)
      acc.low.shift(curr)
      acc.ltl = Math.max(...acc.low)
    } else if (!acc.shiftDetected){
      if (!acc.potentialHigh) acc.potentialHigh = []
      acc.potentialHigh.push(curr)
      checkRules(acc, curr)
    } else {
      acc.high.push(curr)
    }

    return acc
  }, {
    low: [],
    ltl: null,
    shiftDetected: false
  })
}

function rounded(val, step) {
  const inverted = 1 / step
  return Math.round(val * inverted) / inverted
}

function checkRules(acc, curr) {
  function regularRuleApplies() {
    // we round the difference because of JS decimal weirdness
    return acc.potentialHigh.length === 3 && rounded(curr - acc.ltl, 0.01) >= 0.2
  }
  function firstExceptionRuleApplies() {
    return acc.potentialHigh.length === 4 && curr > acc.ltl
  }

  if (regularRuleApplies() || firstExceptionRuleApplies()) {
    acc.shiftDetected = true
    acc.high = acc.potentialHigh
    delete acc.potentialHigh
  }
}

export {
  detectTemperatureShift
}