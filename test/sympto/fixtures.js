
function convertToSymptoFormat(val, i) {
  ++i
  const dayString = i < 10 ? `0${i}` : i
  const sympto = { date: `2018-06-${dayString}` }
  if (val.temperature) sympto.temperature = { value: val.temperature }
  if (val.mucus) sympto.mucus = { value: val.mucus }
  if (val.bleeding) sympto.bleeding = { value: val.bleeding }
  return sympto
}

const cycleWithTempShift = [36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.8, 36.8, 36.8]
  .map(num => ({ temperature: num }))
  .map(convertToSymptoFormat)

const cycleWithoutTempShift = [36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.8, 36.8]
  .map(num => ({ temperature: num }))
  .map(convertToSymptoFormat)

const cycleWithTempAndMucusShift = [
  { temperature: 36.6, bleeding: 2 },
  { temperature: 36.65 },
  { temperature: 36.5 },
  { temperature: 36.6 },
  { temperature: 36.55 },
  { temperature: 36.7, mucus: 0 },
  { temperature: 36.75, mucus: 0 },
  { temperature: 36.45, mucus: 1 },
  { temperature: 36.5, mucus: 4 },
  { temperature: 36.4, mucus: 2 },
  { temperature: 36.5, mucus: 3 },
  { temperature: 36.55, mucus: 3 },
  { temperature: 36.45, mucus: 3 },
  { temperature: 36.5, mucus: 4 },
  { temperature: 36.55, mucus: 4 },
  { temperature: 36.7, mucus: 3 },
  { temperature: 36.65, mucus: 3 },
  { temperature: 36.75, mucus: 4 },
  { temperature: 36.8, mucus: 1 },
  { temperature: 36.85, mucus: 2 },
  { temperature: 36.8, mucus: 2 },
  { temperature: 36.9, mucus: 2 },
  { temperature: 36.9, mucus: 1 },
  { temperature: 36.85, mucus: 1 },
  { temperature: 36.9, mucus: 1 },
  { temperature: 36.8, mucus: 1 },
  { temperature: 36.9, mucus: 1 }
].map(convertToSymptoFormat)

const cycleWithTempAndNoMucusShift = [
  { temperature: 36.6, bleeding: 2 },
  { temperature: 36.65 },
  { temperature: 36.5 },
  { temperature: 36.6 },
  { temperature: 36.55 },
  { temperature: 36.7, mucus: 0 },
  { temperature: 36.75, mucus: 0 },
  { temperature: 36.45, mucus: 1 },
  { temperature: 36.5, mucus: 4 },
  { temperature: 36.4, mucus: 2 },
  { temperature: 36.5, mucus: 3 },
  { temperature: 36.55, mucus: 3 },
  { temperature: 36.45, mucus: 3 },
  { temperature: 36.5, mucus: 4 },
  { temperature: 36.55, mucus: 4 },
  { temperature: 36.7, mucus: 3 },
  { temperature: 36.65, mucus: 3 },
  { temperature: 36.75, mucus: 4 },
  { temperature: 36.8, mucus: 4 },
  { temperature: 36.85, mucus: 4 },
  { temperature: 36.8, mucus: 4 },
  { temperature: 36.9, mucus: 4 }
].map(convertToSymptoFormat)

const cycleWithoutAnyShifts = [
  { temperature: 36.6, bleeding: 2 },
  { temperature: 36.65 },
  { temperature: 36.5 },
  { temperature: 36.6 },
  { temperature: 36.55 },
  { temperature: 36.7, mucus: 0 },
  { temperature: 36.75, mucus: 0 },
  { temperature: 36.45, mucus: 1 }
].map(convertToSymptoFormat)

const fiveDayCycle = [
  { temperature: 36.6, bleeding: 2 },
  { temperature: 36.65 },
  { temperature: 36.5 },
  { temperature: 36.6 },
  { temperature: 36.55 }
].map(convertToSymptoFormat)

export {
  cycleWithoutTempShift,
  cycleWithTempAndMucusShift,
  cycleWithTempAndNoMucusShift,
  cycleWithTempShift,
  cycleWithoutAnyShifts,
  fiveDayCycle
}