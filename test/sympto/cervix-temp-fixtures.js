
function convertToSymptoFormat(val) {
  const sympto = { date: val.date }
  if (val.temperature) sympto.temperature = {
    value: val.temperature,
    exclude: false
  }
  if (val.cervix) sympto.cervix = {
    value: val.cervix,
    exclude: false
  }
  if (val.bleeding) sympto.bleeding = {
    value: val.bleeding,
    exclude: false
  }
  return sympto
}

export const idealCycle = [
  { date: '2018-08-01', bleeding: 1, cervix: { isClosed: false, isHard: false } },
  { date: '2018-08-02', bleeding: 2, cervix: { isClosed: false, isHard: false } },
  { date: '2018-08-03', temperature: 36.6, bleeding: 2, cervix: { isClosed: false, isHard: false } },
  { date: '2018-08-04', temperature: 36.55, bleeding: 1, cervix: { isClosed: false, isHard: true } },
  { date: '2018-08-05', temperature: 36.6, bleeding: null, cervix: { isClosed: true, isHard: false } },
  { date: '2018-08-06', temperature: 36.65, bleeding: null, cervix: { isClosed: true, isHard: false } },
  { date: '2018-08-07', temperature: 36.7, bleeding: null, cervix: { isClosed: false, isHard: true } },
  { date: '2018-08-08', temperature: 36.6, bleeding: null, cervix: { isClosed: true, isHard: false } },
  { date: '2018-08-09', temperature: 36.8, bleeding: null, cervix: { isClosed: true, isHard: true } },
  { date: '2018-08-10', temperature: 36.75, bleeding: null, cervix: { isClosed: true, isHard: true } },
  { date: '2018-08-11', temperature: 36.9, bleeding: null, cervix: { isClosed: true, isHard: true } },
  { date: '2018-08-12', temperature: 36.95, bleeding: null, cervix: { isClosed: true, isHard: true } },
  { date: '2018-08-13', temperature: 36.95, bleeding: null, cervix: { isClosed: true, isHard: true } }
].map(convertToSymptoFormat)

export const cycleWithFhmNoCervixShift = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7 },
  { date: '2018-06-08', temperature: 36.7 },
  { date: '2018-06-09', temperature: 36.7 },
  { date: '2018-06-10', temperature: 36.7 },
  { date: '2018-06-11', temperature: 36.7 },
  { date: '2018-06-12', temperature: 36.7 },
  { date: '2018-06-13', temperature: 36.8 },
  { date: '2018-06-15', temperature: 36.9 },
  { date: '2018-06-16', temperature: 36.9 },
  { date: '2018-06-17', temperature: 36.9 },
  { date: '2018-06-18', temperature: 36.9 }
].map(convertToSymptoFormat)

export const cycleWithoutFhm = [
  { date: '2018-06-02', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-03', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-09', temperature: 36.8, cervix: { isClosed: true, isHard: false } },
  { date: '2018-06-10', temperature: 36.9, cervix: { isClosed: false, isHard: true } },
  { date: '2018-06-13', temperature: 36.9, cervix: { isClosed: false, isHard: false } }
].map(convertToSymptoFormat)

export const cycleWithoutAnyShifts = [
  { date: '2018-07-01', temperature: 36.65, bleeding: 2, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-02', temperature: 36.45, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-03', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-04', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-05', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-06', temperature: 36.85, cervix: { isClosed: true, isHard: false } },
  { date: '2018-07-07', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-08', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-09', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-10', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-11', temperature: 36.35, cervix: { isClosed: true, isHard: true } },
  { date: '2018-07-12', temperature: 36.65, cervix: { isClosed: true, isHard: true } },
  { date: '2018-07-13', temperature: 36.25, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-14', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-15', temperature: 36.65, cervix: { isClosed: false, isHard: true } },
  { date: '2018-07-16', temperature: 36.15, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-17', temperature: 36.65, cervix: { isClosed: true, isHard: false } },
  { date: '2018-07-18', temperature: 36.25, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-19', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-20', temperature: 36.45, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-21', temperature: 36.5, cervix: { isClosed: true, isHard: true } },
  { date: '2018-07-22', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-23', temperature: 36.75, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-24', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-07-25', temperature: 36.65, cervix: { isClosed: true, isHard: false } },
  { date: '2018-07-26', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
].map(convertToSymptoFormat)

export const longAndComplicatedCycle = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-09', temperature: 36.5, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-10', temperature: 36.4, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-13', temperature: 36.45, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-14', temperature: 36.5, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-15', temperature: 36.55, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-16', temperature: 36.7, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-17', temperature: 36.65, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-18', temperature: 36.75, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-19', temperature: 36.8, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-20', temperature: 36.85, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-21', temperature: 36.8, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-22', temperature: 36.9, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-25', temperature: 36.9, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-26', temperature: 36.8, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-27', temperature: 36.9, cervix: { isClosed: true, isHard: true } }
].map(convertToSymptoFormat)

export const tempAndCervixEvalEndOnSameDay = [
  { date: '2018-06-01', bleeding: 2 },
  { date: '2018-06-02', bleeding: 1 },
  { date: '2018-06-03', bleeding: 1 },
  { date: '2018-06-04', bleeding: 2 },
  { date: '2018-06-05', bleeding: 1 },
  { date: '2018-06-06', bleeding: 1 },
  { date: '2018-06-07', cervix: { isClosed: false, isHard: true } },
  { date: '2018-06-08', temperature: 36.45, cervix: { isClosed: true, isHard: false } },
  { date: '2018-06-09', temperature: 36.5, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-10', temperature: 36.30, cervix: { isClosed: true, isHard: false } },
  { date: '2018-06-11', temperature: 36.30, cervix: { isClosed: false, isHard: true } },
  { date: '2018-06-12', temperature: 36.4, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-13', temperature: 36.3, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-14', temperature: 36.4, cervix: { isClosed: false, isHard: false } },
  { date: '2018-06-15', temperature: 36.8, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-16', temperature: 36.8, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-17', temperature: 36.9, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-18', temperature: 36.9, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-19', temperature: 36.95, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-20', temperature: 37.0, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-21', temperature: 37.0, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-22', temperature: 37.0, cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-23', cervix: { isClosed: true, isHard: true } },
  { date: '2018-06-24', cervix: { isClosed: true, isHard: true }},
  { date: '2018-06-25', cervix: { isClosed: false, isHard: false } }
].map(convertToSymptoFormat)

export const cervixShiftWaitsForTempShift = [
  { date: '2018-05-08', bleeding: 3 },
  { date: '2018-05-09', bleeding: 2 },
  { date: '2018-05-10', bleeding: 2 },
  { date: '2018-05-11', bleeding: 1 },
  { date: '2018-05-12', temperature: 36.3, cervix: { isClosed: false, isHard: false } },
  { date: '2018-05-13', temperature: 36.4, cervix: { isClosed: false, isHard: false } },
  { date: '2018-05-14', temperature: 36.3, cervix: { isClosed: false, isHard: false } },
  { date: '2018-05-15', temperature: 36.2, cervix: { isClosed: false, isHard: false } },
  { date: '2018-05-16', temperature: 36.3, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-17', temperature: 36.3, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-18', temperature: 36.55, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-19', temperature: 36.65, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-20', temperature: 36.7, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-21', temperature: 36.6, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-22', temperature: 36.85, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-23', temperature: 36.8, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-24', temperature: 36.85, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-25', temperature: 36.95, cervix: { isClosed: true, isHard: true } },
  { date: '2018-05-26', temperature: 36.85, cervix: { isClosed: true, isHard: false } },
  { date: '2018-05-27', temperature: 36.8, cervix: { isClosed: false, isHard: true } },
  { date: '2018-05-28', temperature: 36.6, cervix: { isClosed: false, isHard: true } },
  { date: '2018-05-29', bleeding: 2 }
].map(convertToSymptoFormat)

export const tempShiftWaitsForCervixShift = [
  { date: '2018-04-05', bleeding: 3 },
  { date: '2018-04-06', bleeding: 2 },
  { date: '2018-04-07', bleeding: 2 },
  { date: '2018-04-08', bleeding: 1 },
  { date: '2018-04-09', temperature: 36.5, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-10', temperature: 36.5, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-11', temperature: 36.55, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-12', temperature: 36.5, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-13', temperature: 36.35, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-14', temperature: 36.35, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-15', temperature: 36.6, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-16', temperature: 36.8, cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-17', cervix: { isClosed: false, isHard: false } },
  { date: '2018-04-18', temperature: 36.8, cervix: { isClosed: false, isHard: true } },
  { date: '2018-04-19', temperature: 36.85, cervix: { isClosed: true, isHard: true } },
  { date: '2018-04-20', temperature: 37.0, cervix: { isClosed: true, isHard: true } },
  { date: '2018-04-21', temperature: 36.9, cervix: { isClosed: true, isHard: true } },
  { date: '2018-04-22', temperature: 36.9, cervix: { isClosed: true, isHard: true } },
  { date: '2018-04-23', temperature: 37.1, cervix: { isClosed: true, isHard: true } },
  { date: '2018-04-24', temperature: 36.75, cervix: { isClosed: false, isHard: false } }
].map(convertToSymptoFormat)

export const noInfertilePhaseDetected = [
  { date: '2018-03-08', bleeding: 3 },
  { date: '2018-03-09', bleeding: 3 },
  { date: '2018-03-10', bleeding: 3 },
  { date: '2018-03-11', bleeding: 3 },
  { date: '2018-03-12', temperature: 36.3, cervix: { isClosed: true, isHard: false } },
  { date: '2018-03-13', temperature: 36.5, cervix: { isClosed: false, isHard: false } },
  { date: '2018-03-14', temperature: 36.45, cervix: { isClosed: false, isHard: false } },
  { date: '2018-03-15', temperature: 36.4, cervix: { isClosed: false, isHard: false } },
  { date: '2018-03-16', temperature: 36.2, cervix: { isClosed: false, isHard: false } },
  { date: '2018-03-17', temperature: 36.5, cervix: { isClosed: false, isHard: false } },
  { date: '2018-03-18', temperature: 36.6, cervix: { isClosed: false, isHard: false } },
  { date: '2018-03-19', temperature: 36.35, cervix: { isClosed: false, isHard: true } },
  { date: '2018-03-20', temperature: 36.8, cervix: { isClosed: true, isHard: true } },
  { date: '2018-03-21', temperature: 36.7, cervix: { isClosed: true, isHard: true } },
  { date: '2018-03-22', temperature: 36.7, cervix: { isClosed: true, isHard: false } },
  { date: '2018-03-23', temperature: 36.7, cervix: { isClosed: true, isHard: true } }
].map(convertToSymptoFormat)

export const fiveDayCycle = [
  { date: '2018-08-01', bleeding: 2 },
  { date: '2018-08-03', bleeding: 3 },
  { date: '2018-08-05', bleeding: 0 }
].map(convertToSymptoFormat)
