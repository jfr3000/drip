function convertToSymptoFormat(val) {
  const sympto = { date: val.date }
  if (val.temperature) sympto.temperature = {
    value: val.temperature,
    time: '08:00',
    exclude: false
  }
  if (val.cervix && typeof val.cervix.opening === 'number' && typeof val.cervix.firmness === 'number') sympto.cervix = {
    opening: val.cervix.opening,
    firmness: val.cervix.firmness,
    exclude: false
  }
  if (val.bleeding) sympto.bleeding = {
    value: val.bleeding,
    exclude: false
  }
  return sympto
}

export const cervixShiftAndFhmOnSameDay = [
  { date: '2018-08-01', bleeding: 1 },
  { date: '2018-08-02', bleeding: 2 },
  { date: '2018-08-03', temperature: 36.6, bleeding: 2 },
  { date: '2018-08-04', temperature: 36.55, bleeding: 1 },
  { date: '2018-08-05', temperature: 36.6, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-08-06', temperature: 36.65, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-08-07', temperature: 36.71, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-08-08', temperature: 36.69, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-08-09', temperature: 36.64, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-08-10', temperature: 36.66, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-08-11', temperature: 36.61, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-08-12', temperature: 36.6, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-08-13', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-08-14', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-08-15', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-08-16', temperature: 36.95, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-08-17', temperature: 36.95, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const cycleWithFhmNoCervixShift = [
  { date: '2018-08-01', bleeding: 1 },
  { date: '2018-08-02', bleeding: 2 },
  { date: '2018-08-03', temperature: 36.6, bleeding: 2 },
  { date: '2018-08-04', temperature: 36.55, bleeding: 1 },
  { date: '2018-08-05', temperature: 36.6 },
  { date: '2018-08-06', temperature: 36.65, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-08-07', temperature: 36.7, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-08-08', temperature: 36.6, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-08-09', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-08-10', temperature: 36.85, cervix: { opening: 2, firmness: 0 } },
  { date: '2018-08-11', temperature: 36.9, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-08-12', temperature: 36.95, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-08-13', temperature: 36.95, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const cycleWithoutFhmNoCervixShift = [
  { date: '2018-06-02', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-03', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-09', temperature: 36.8 },
  { date: '2018-06-10', temperature: 36.9, cervix: { opening: 2, firmness: 0 } },
  { date: '2018-06-13', temperature: 36.9, cervix: { opening: 1, firmness: 1 } }
].map(convertToSymptoFormat)

export const longCycleWithoutAnyShifts = [
  { date: '2018-07-01', temperature: 36.65, bleeding: 1 },
  { date: '2018-07-02', temperature: 36.45 },
  { date: '2018-07-03', temperature: 36.65 },
  { date: '2018-07-04', temperature: 36.65 },
  { date: '2018-07-05', temperature: 36.65, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-07-06', temperature: 36.85, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-07-07', temperature: 36.65, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-08', temperature: 36.65, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-07-09', temperature: 36.65, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-07-10', temperature: 36.65, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-11', temperature: 36.35, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-07-12', temperature: 36.65, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-07-13', temperature: 36.25, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-14', temperature: 36.65, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-15', temperature: 36.65, cervix: { opening: 2, firmness: 0 } },
  { date: '2018-07-16', temperature: 36.15, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-07-17', temperature: 36.65, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-07-18', temperature: 36.25, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-07-19', temperature: 36.65, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-20', temperature: 36.45, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-21', temperature: 36.52, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-07-22', temperature: 36.65, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-23', temperature: 36.75, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-24', temperature: 36.65, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-07-25', temperature: 36.65, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-07-26', temperature: 36.65, cervix: { opening: 2, firmness: 1 } },
].map(convertToSymptoFormat)

export const longAndComplicatedCycle = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-07', temperature: 36.5, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-08', temperature: 36.52, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-09', temperature: 36.5, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-10', temperature: 36.7, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-13', temperature: 36.45, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-14', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-15', temperature: 36.55, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-16', temperature: 36.5, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-17', temperature: 36.5, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-18', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-19', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-20', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-21', temperature: 36.8, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-22', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-25', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-26', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-27', temperature: 36.9, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const tempShift3DaysAfterCervixShift = [
  { date: '2018-05-08', bleeding: 3 },
  { date: '2018-05-09', bleeding: 2 },
  { date: '2018-05-10', bleeding: 2 },
  { date: '2018-05-11', bleeding: 1 },
  { date: '2018-05-12', temperature: 36.3 },
  { date: '2018-05-13', temperature: 36.4, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-05-14', temperature: 36.3, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-05-15', temperature: 36.2, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-05-16', temperature: 36.3, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-17', temperature: 36.3, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-18', temperature: 36.35, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-19', temperature: 36.65, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-20', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-21', temperature: 36.6, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-22', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-23', temperature: 36.8, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-05-24', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-25', temperature: 36.95, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-05-26', temperature: 36.85, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-05-27', temperature: 36.8, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-05-28', temperature: 36.6, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-05-29', bleeding: 2 }
].map(convertToSymptoFormat)

export const cervixShift3DaysAfterTempShift = [
  { date: '2018-04-05', bleeding: 3 },
  { date: '2018-04-06', bleeding: 2 },
  { date: '2018-04-07', bleeding: 2 },
  { date: '2018-04-08', bleeding: 1 },
  { date: '2018-04-09', temperature: 36.5 },
  { date: '2018-04-10', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-11', temperature: 36.55, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-12', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-13', temperature: 36.35, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-14', temperature: 36.35, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-15', temperature: 36.6, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-16', temperature: 36.8, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-17', temperature: 36.8, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-04-18', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-19', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-20', temperature: 37.0, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-22', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-23', temperature: 37.1, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-24', temperature: 36.75, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const cervixShift4DaysAfterTempShift = [
  { date: '2018-04-05', bleeding: 3 },
  { date: '2018-04-06', bleeding: 2 },
  { date: '2018-04-07', bleeding: 2 },
  { date: '2018-04-08', bleeding: 1 },
  { date: '2018-04-09', temperature: 36.5 },
  { date: '2018-04-10', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-11', temperature: 36.55, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-12', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-13', temperature: 36.35, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-14', temperature: 36.35, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-15', temperature: 36.6, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-16', temperature: 36.8, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-04-17', temperature: 36.8, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-04-18', temperature: 36.8, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-04-19', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-20', temperature: 37.0, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-22', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-23', temperature: 37.1, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-04-24', temperature: 36.75, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const noOvulationDetected = [
  { date: '2018-03-08', bleeding: 3 },
  { date: '2018-03-09', bleeding: 3 },
  { date: '2018-03-10', bleeding: 3 },
  { date: '2018-03-11', bleeding: 3 },
  { date: '2018-03-12', temperature: 36.3, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-03-13', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-03-14', temperature: 36.45, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-03-15', temperature: 36.4, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-03-16', temperature: 36.2, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-03-17', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-03-18', temperature: 36.6, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-03-19', temperature: 36.35, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-03-20', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-03-21', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-03-22', temperature: 36.7, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-03-23', temperature: 36.7, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const fiveDayCycle = [
  { date: '2018-08-01', bleeding: 2 },
  { date: '2018-08-03', bleeding: 3 }
].map(convertToSymptoFormat)

export const fhmOnDay12 = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-09', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-10', temperature: 36.4, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-12', temperature: 36.8, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-14', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-17', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-18', temperature: 36.9, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const fhmOnDay15 = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-09', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-10', temperature: 36.4, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-11', temperature: 36.4, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-12', temperature: 36.4, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-14', temperature: 36.4, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-15', temperature: 36.8, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-16', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-17', temperature: 36.9, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-18', temperature: 36.9, cervix: { opening: 0, firmness: 0 } }
].map(convertToSymptoFormat)

export const cycleWithEarlyCervix = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-08', temperature: 36.45, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-09', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-10', temperature: 36.4, cervix: { opening: 2, firmness: 0 } },
  { date: '2018-06-11', temperature: 36.5, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-13', temperature: 36.45, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-14', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-15', temperature: 36.55, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-16', temperature: 36.7, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-06-17', temperature: 36.65, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-06-18', temperature: 36.75, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-19', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-20', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-23', temperature: 36.9, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-06-24', temperature: 36.85, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-26', temperature: 36.8, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-27', temperature: 36.9, cervix: { opening: 1, firmness: 1 } }
].map(convertToSymptoFormat)

export const cycleWithCervixOnFirstDay = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-08', temperature: 36.45, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-09', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-10', temperature: 36.4, cervix: { opening: 2, firmness: 0 } },
  { date: '2018-06-11', temperature: 36.5, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-13', temperature: 36.45, cervix: { opening: 2, firmness: 1 } },
  { date: '2018-06-14', temperature: 36.5, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-15', temperature: 36.55, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-16', temperature: 36.7, cervix: { opening: 1, firmness: 0 } },
  { date: '2018-06-17', temperature: 36.65, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-06-18', temperature: 36.75, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-19', temperature: 36.8, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-20', temperature: 36.85, cervix: { opening: 0, firmness: 0 } },
  { date: '2018-06-23', temperature: 36.9, cervix: { opening: 0, firmness: 1 } },
  { date: '2018-06-24', temperature: 36.85, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-26', temperature: 36.8, cervix: { opening: 1, firmness: 1 } },
  { date: '2018-06-27', temperature: 36.9, cervix: { opening: 1, firmness: 1 } }
].map(convertToSymptoFormat)

export const fertileCervixOnlyAfterEndOfTempEval = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7 },
  { date: '2018-06-09', temperature: 36.5 },
  { date: '2018-06-10', temperature: 36.4 },
  { date: '2018-06-13', temperature: 36.45 },
  { date: '2018-06-14', temperature: 36.5 },
  { date: '2018-06-15', temperature: 36.55 },
  { date: '2018-06-16', temperature: 36.7 },
  { date: '2018-06-17', temperature: 36.65 },
  { date: '2018-06-18', temperature: 36.60 },
  { date: '2018-06-19', temperature: 36.8 },
  { date: '2018-06-20', temperature: 36.85 },
  { date: '2018-06-21', temperature: 36.8 },
  { date: '2018-06-22', temperature: 36.9 },
  { date: '2018-06-25', temperature: 36.9, cervix: { opening: 1, firmness: 1 }},
  { date: '2018-06-26', temperature: 36.8, cervix: { opening: 0, firmness: 0 }},
  { date: '2018-06-30', temperature: 36.9, cervix: { opening: 0, firmness: 0 }},
  { date: '2018-07-01', temperature: 36.9, cervix: { opening: 0, firmness: 0 }},
  { date: '2018-07-02', temperature: 36.9, cervix: { opening: 0, firmness: 0 }}
].map(convertToSymptoFormat)
