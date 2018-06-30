function getTemperatureStatus(targetDateString, previousDaysInCycle) {
  const tempValues = previousDaysInCycle
    .filter(day => day.temperature)
    .map(day => !day.temperature.exclude && rounded(day.temperature.value, 0.05))

  return tempValues.reduce((acc, curr) => {
    // if we don't yet have 6 lower temps, we just collect
    // if no shift has been detected, we collect low temps
    // after the shift has been detected, we count them as part
    // of the higher temperature phase
    if (acc.low.length < 6 || (!acc.shiftDetected && curr <= acc.ltl)) {
      acc.low.push(curr)
      acc.ltl = Math.max(...acc.low.slice(-6))
    } else {
      acc.high.push(curr)
    }

    // we round the difference because of JS decimal weirdness
    if (acc.high.length === 3 && rounded(curr - acc.ltl, 0.01) >= 0.2) {
      acc.shiftDetected = true
    }

    return acc
  }, {
    low: [],
    high: [],
    ltl: null,
    shiftDetected: false
  })
}

function rounded(val, step) {
  const inverted = 1 / step
  return Math.round(val * inverted) / inverted
}

export {
  getTemperatureStatus
}