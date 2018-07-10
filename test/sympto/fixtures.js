
function convertToSymptoFormat(val) {
  const sympto = { date: val.date }
  if (val.temperature) sympto.temperature = { value: val.temperature }
  if (val.mucus) sympto.mucus = { value: val.mucus }
  if (val.bleeding) sympto.bleeding = { value: val.bleeding }
  return sympto
}

const cycleWithTempShift = [36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.8, 36.8, 36.8]
  .map(num => ({ date: '2018-06-01', temperature: num }))
  .map(convertToSymptoFormat)
cycleWithTempShift.unshift({date: '2018-05-30', bleeding: { value: 2 }})

const cycleWithoutTempShift = [36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.8, 36.8]
  .map(num => ({ date: '2018-06-01', temperature: num }))
  .map(convertToSymptoFormat)
cycleWithoutTempShift.unshift({date: '2018-05-30', bleeding: { value: 2 }})

const cycleWithTempAndMucusShift = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 4 },
  { date: '2018-06-10', temperature: 36.4, mucus: 2 },
  { date: '2018-06-13', temperature: 36.45, mucus: 3 },
  { date: '2018-06-14', temperature: 36.5, mucus: 4 },
  { date: '2018-06-15', temperature: 36.55, mucus: 4 },
  { date: '2018-06-16', temperature: 36.7, mucus: 3 },
  { date: '2018-06-17', temperature: 36.65, mucus: 3 },
  { date: '2018-06-18', temperature: 36.75, mucus: 4 },
  { date: '2018-06-19', temperature: 36.8, mucus: 1 },
  { date: '2018-06-20', temperature: 36.85, mucus: 2 },
  { date: '2018-06-21', temperature: 36.8, mucus: 2 },
  { date: '2018-06-22', temperature: 36.9, mucus: 2 },
  { date: '2018-06-25', temperature: 36.9, mucus: 1 },
  { date: '2018-06-26', temperature: 36.8, mucus: 1 },
  { date: '2018-06-27', temperature: 36.9, mucus: 1 }
].map(convertToSymptoFormat)

const cycleWithTempAndNoMucusShift = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-08', temperature: 36.45, mucus: 1 },
  { date: '2018-06-09', temperature: 36.5, mucus: 4 },
  { date: '2018-06-10', temperature: 36.4, mucus: 2 },
  { date: '2018-06-11', temperature: 36.5, mucus: 3 },
  { date: '2018-06-13', temperature: 36.45, mucus: 3 },
  { date: '2018-06-14', temperature: 36.5, mucus: 4 },
  { date: '2018-06-15', temperature: 36.55, mucus: 4 },
  { date: '2018-06-16', temperature: 36.7, mucus: 3 },
  { date: '2018-06-17', temperature: 36.65, mucus: 3 },
  { date: '2018-06-18', temperature: 36.75, mucus: 4 },
  { date: '2018-06-19', temperature: 36.8, mucus: 4 },
  { date: '2018-06-20', temperature: 36.85, mucus: 4 },
  { date: '2018-06-23', temperature: 36.9, mucus: 3 },
  { date: '2018-06-24', temperature: 36.85, mucus: 4 },
  { date: '2018-06-26', temperature: 36.8, mucus: 4 },
  { date: '2018-06-27', temperature: 36.9, mucus: 4 }
].map(convertToSymptoFormat)

const cycleWithoutAnyShifts = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-07', temperature: 36.75, mucus: 0 },
  { date: '2018-06-08', temperature: 36.45, mucus: 1 }
].map(convertToSymptoFormat)

const fiveDayCycle = [
  { date: '2018-06-01', bleeding: 2 },
  { date: '2018-06-03', bleeding: 3 },
].map(convertToSymptoFormat)

export {
  cycleWithoutTempShift,
  cycleWithTempAndMucusShift,
  cycleWithTempAndNoMucusShift,
  cycleWithTempShift,
  cycleWithoutAnyShifts,
  fiveDayCycle
}