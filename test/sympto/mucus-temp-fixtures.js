
function convertToSymptoFormat(val) {
  const sympto = { date: val.date }
  if (val.temperature) sympto.temperature = { value: val.temperature }
  if (val.mucus) sympto.mucus = { value: val.mucus }
  if (val.bleeding) sympto.bleeding = { value: val.bleeding }
  if (val.cervix) {
    sympto.cervix = {}
    if (val.cervix === 'firm & closed') {
      sympto.cervix.firmAndClosed = true
    } else {
      sympto.cervix.firmAndClosed = false
    }
  }
  return sympto
}

export const cycleWithFhm = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-13', temperature: 36.8, mucus: 4 },
  { date: '2018-06-15', temperature: 36.9, mucus: 2 },
  { date: '2018-06-16', temperature: 36.9, mucus: 2 },
  { date: '2018-06-17', temperature: 36.9, mucus: 2 },
  { date: '2018-06-18', temperature: 36.9, mucus: 2 }
].map(convertToSymptoFormat)

export const cycleWithoutFhm = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.8, mucus: 4 },
  { date: '2018-06-10', temperature: 36.9, mucus: 2 },
  { date: '2018-06-13', temperature: 36.9, mucus: 2 }
].map(convertToSymptoFormat)

export const longAndComplicatedCycle = [
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

export const cycleWithTempAndNoMucusShift = [
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

export const cycleWithEarlyMucus = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65, mucus: 3 },
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

export const cycleWithMucusOnFirstDay = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2, mucus: 3},
  { date: '2018-06-02', temperature: 36.65, mucus: 3 },
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

export const cycleWithoutAnyShifts = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-07', temperature: 36.75, mucus: 0 },
  { date: '2018-06-08', temperature: 36.45, mucus: 1 }
].map(convertToSymptoFormat)

export const fiveDayCycle = [
  { date: '2018-06-01', bleeding: 2 },
  { date: '2018-06-03', bleeding: 3 },
].map(convertToSymptoFormat)

export const mucusPeakAndFhmOnSameDay = [
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
  { date: '2018-06-19', temperature: 36.8, mucus: 3 },
  { date: '2018-06-20', temperature: 36.9, mucus: 2 },
  { date: '2018-06-21', temperature: 36.8, mucus: 2 },
  { date: '2018-06-22', temperature: 36.9, mucus: 2 },
  { date: '2018-06-25', temperature: 36.9, mucus: 1 },
  { date: '2018-06-26', temperature: 36.8, mucus: 1 },
  { date: '2018-06-27', temperature: 36.9, mucus: 1 }
].map(convertToSymptoFormat)

export const fhmTwoDaysBeforeMucusPeak = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 1 },
  { date: '2018-06-10', temperature: 36.4, mucus: 2 },
  { date: '2018-06-13', temperature: 36.45, mucus: 2 },
  { date: '2018-06-14', temperature: 36.5, mucus: 2 },
  { date: '2018-06-15', temperature: 36.55, mucus: 1 },
  { date: '2018-06-16', temperature: 36.7, mucus: 2 },
  { date: '2018-06-17', temperature: 36.65, mucus: 2 },
  { date: '2018-06-18', temperature: 36.75, mucus: 2 },
  { date: '2018-06-19', temperature: 36.8, mucus: 3 },
  { date: '2018-06-20', temperature: 36.85, mucus: 2 },
  { date: '2018-06-21', temperature: 36.8, mucus: 4 },
  { date: '2018-06-22', temperature: 36.9, mucus: 2 },
  { date: '2018-06-25', temperature: 36.9, mucus: 1 },
  { date: '2018-06-26', temperature: 36.8, mucus: 1 },
].map(convertToSymptoFormat)

export const mucusPeakTwoDaysBeforeFhm = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55, mucus: 2 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 4 },
  { date: '2018-06-10', temperature: 36.4, mucus: 2 },
  { date: '2018-06-13', temperature: 36.45, mucus: 3 },
  { date: '2018-06-14', temperature: 36.5, mucus: 4 },
  { date: '2018-06-15', temperature: 36.55, mucus: 4 },
  { date: '2018-06-16', temperature: 36.7, mucus: 4 },
  { date: '2018-06-17', temperature: 36.65, mucus: 3 },
  { date: '2018-06-18', temperature: 36.75, mucus: 2 },
  { date: '2018-07-02', temperature: 36.8, mucus: 3 },
  { date: '2018-07-03', temperature: 36.9, mucus: 2 },
  { date: '2018-07-04', temperature: 36.8, mucus: 2 },
].map(convertToSymptoFormat)

export const mucusPeak5DaysAfterFhm = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65, mucus: 2 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 4 },
  { date: '2018-06-10', temperature: 36.4, mucus: 2 },
  { date: '2018-06-13', temperature: 36.45, mucus: 3 },
  { date: '2018-06-14', temperature: 36.5, mucus: 3 },
  { date: '2018-06-15', temperature: 36.55, mucus: 3 },
  { date: '2018-06-16', temperature: 36.7, mucus: 3 },
  { date: '2018-06-17', temperature: 36.65, mucus: 3 },
  { date: '2018-06-18', temperature: 36.60, mucus: 2 },
  { date: '2018-06-19', temperature: 36.8, mucus: 2 },
  { date: '2018-06-20', temperature: 36.85, mucus: 2 },
  { date: '2018-06-21', temperature: 36.8, mucus: 2 },
  { date: '2018-06-22', temperature: 36.9, mucus: 2 },
  { date: '2018-06-25', temperature: 36.9, mucus: 1 },
  { date: '2018-06-26', temperature: 36.8, mucus: 4 },
  { date: '2018-06-30', temperature: 36.9, mucus: 1 },
  { date: '2018-07-01', temperature: 36.9, mucus: 1 },
  { date: '2018-07-02', temperature: 36.9, mucus: 1 }
].map(convertToSymptoFormat)

export const highestMucusQualityAfterEndOfEval = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65, mucus: 2 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 1 },
  { date: '2018-06-10', temperature: 36.4, mucus: 2 },
  { date: '2018-06-13', temperature: 36.45, mucus: 3 },
  { date: '2018-06-14', temperature: 36.5, mucus: 3 },
  { date: '2018-06-15', temperature: 36.55, mucus: 3 },
  { date: '2018-06-16', temperature: 36.7, mucus: 3 },
  { date: '2018-06-17', temperature: 36.65, mucus: 3 },
  { date: '2018-06-18', temperature: 36.60, mucus: 2 },
  { date: '2018-06-19', temperature: 36.8, mucus: 3 },
  { date: '2018-06-20', temperature: 36.85, mucus: 3 },
  { date: '2018-06-21', temperature: 36.8, mucus: 3 },
  { date: '2018-06-22', temperature: 36.9, mucus: 1 },
  { date: '2018-06-25', temperature: 36.9, mucus: 1 },
  { date: '2018-06-26', temperature: 36.8, mucus: 1 },
  { date: '2018-06-30', temperature: 36.9, mucus: 1 },
  { date: '2018-07-01', temperature: 36.9, mucus: 4 },
  { date: '2018-07-02', temperature: 36.9, mucus: 1 }
].map(convertToSymptoFormat)

export const fhm5DaysAfterMucusPeak = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 4 },
  { date: '2018-06-10', temperature: 36.4, mucus: 2 },
  { date: '2018-06-13', temperature: 36.45, mucus: 3 },
  { date: '2018-06-14', temperature: 36.5, mucus: 4 },
  { date: '2018-06-15', temperature: 36.55, mucus: 3 },
  { date: '2018-06-16', temperature: 36.7, mucus: 3 },
  { date: '2018-06-17', temperature: 36.65, mucus: 3 },
  { date: '2018-06-18', temperature: 36.75, mucus: 2 },
  { date: '2018-06-19', temperature: 36.8, mucus: 2 },
  { date: '2018-06-20', temperature: 36.85, mucus: 2 },
  { date: '2018-06-21', temperature: 36.8, mucus: 2 },
  { date: '2018-06-22', temperature: 36.9, mucus: 2 },
  { date: '2018-06-25', temperature: 36.9, mucus: 1 },
  { date: '2018-06-26', temperature: 36.8, mucus: 4 },
  { date: '2018-06-27', temperature: 36.9, mucus: 1 }
].map(convertToSymptoFormat)

export const fhmOnDay12 = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 2 },
  { date: '2018-06-10', temperature: 36.4, mucus: 3 },
  { date: '2018-06-12', temperature: 36.8, mucus: 3 },
  { date: '2018-06-14', temperature: 36.9, mucus: 2 },
  { date: '2018-06-17', temperature: 36.9, mucus: 2 },
  { date: '2018-06-18', temperature: 36.9, mucus: 2 },
].map(convertToSymptoFormat)

export const fhmOnDay15 = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-05', temperature: 36.55 },
  { date: '2018-06-06', temperature: 36.7, mucus: 0 },
  { date: '2018-06-09', temperature: 36.5, mucus: 2 },
  { date: '2018-06-10', temperature: 36.4, mucus: 3 },
  { date: '2018-06-15', temperature: 36.8, mucus: 3 },
  { date: '2018-06-16', temperature: 36.9, mucus: 2 },
  { date: '2018-06-17', temperature: 36.9, mucus: 2 },
  { date: '2018-06-18', temperature: 36.9, mucus: 2 },
].map(convertToSymptoFormat)

export const mucusPeakSlightlyBeforeTempShift = [
  { date: '2018-06-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-06-02', temperature: 36.65 },
  { date: '2018-06-04', temperature: 36.6 },
  { date: '2018-06-07', temperature: 36.4, mucus: 1 },
  { date: '2018-06-08', temperature: 36.35, mucus: 2},
  { date: '2018-06-09', temperature: 36.4, mucus: 2},
  { date: '2018-06-10', temperature: 36.45, mucus: 2},
  { date: '2018-06-11', temperature: 36.4, mucus: 3},
  { date: '2018-06-12', temperature: 36.45, mucus: 3},
  { date: '2018-06-13', temperature: 36.45, mucus: 4},
  { date: '2018-06-14', temperature: 36.55, mucus: 3},
  { date: '2018-06-15', temperature: 36.6, mucus: 3},
  { date: '2018-06-16', temperature: 36.6, mucus: 3},
  { date: '2018-06-17', temperature: 36.55, mucus: 2},
  { date: '2018-06-18', temperature: 36.6, mucus: 1},
  { date: '2018-06-19', temperature: 36.7, mucus: 1},
  { date: '2018-06-20', temperature: 36.75, mucus: 1},
  { date: '2018-06-21', temperature: 36.8, mucus: 1},
  { date: '2018-06-22', temperature: 36.8, mucus: 1}
].map(convertToSymptoFormat)
