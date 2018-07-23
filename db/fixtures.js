function convertToSymptoFormat(val) {
  const sympto = { date: val.date }
  if (val.temperature) sympto.temperature = { value: val.temperature, exclude: false }
  if (val.mucus) sympto.mucus = {
    value: val.mucus,
    exclude: false,
    feeling: val.mucus,
    texture: val.mucus
  }
  if (val.bleeding) sympto.bleeding = { value: val.bleeding, exclude: false }
  return sympto
}

export const cycleWithFhm = [
  { date: '2018-07-01', bleeding: 2 },
  { date: '2018-07-02', bleeding: 1 },
  { date: '2018-07-06', temperature: 36.2},
  { date: '2018-07-07', temperature: 36.35 },
  { date: '2018-07-09', temperature: 36.6 },
  { date: '2018-07-10', temperature: 36.45 },
  { date: '2018-07-12', temperature: 36.7, mucus: 0 },
  { date: '2018-07-13', temperature: 36.8, mucus: 4 },
  { date: '2018-07-15', temperature: 36.9, mucus: 2 },
  { date: '2018-07-16', temperature: 36.95, mucus: 2 },
  { date: '2018-07-17', temperature: 36.9, mucus: 2 },
  { date: '2018-07-18', temperature: 36.9, mucus: 2 }
].map(convertToSymptoFormat).reverse()

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
].map(convertToSymptoFormat).reverse()

export const cycleWithTempAndNoMucusShift = [
  { date: '2018-05-01', temperature: 36.6, bleeding: 2 },
  { date: '2018-05-02', temperature: 36.65 },
  { date: '2018-05-05', temperature: 36.55 },
  { date: '2018-05-06', temperature: 36.7, mucus: 0 },
  { date: '2018-05-08', temperature: 36.45, mucus: 1 },
  { date: '2018-05-09', temperature: 36.5, mucus: 4 },
  { date: '2018-05-10', temperature: 36.4, mucus: 2 },
  { date: '2018-05-11', temperature: 36.5, mucus: 3 },
  { date: '2018-05-13', temperature: 36.45, mucus: 3 },
  { date: '2018-05-14', temperature: 36.5, mucus: 4 },
  { date: '2018-05-15', temperature: 36.55, mucus: 4 },
  { date: '2018-05-16', temperature: 36.7, mucus: 3 },
  { date: '2018-05-17', temperature: 36.65, mucus: 3 },
  { date: '2018-05-18', temperature: 36.75, mucus: 4 },
  { date: '2018-05-19', temperature: 36.8, mucus: 4 },
  { date: '2018-05-20', temperature: 36.85, mucus: 4 },
  { date: '2018-05-23', temperature: 36.9, mucus: 3 },
  { date: '2018-05-24', temperature: 36.85, mucus: 4 },
  { date: '2018-05-26', temperature: 36.8, mucus: 4 },
  { date: '2018-05-27', temperature: 36.9, mucus: 4 }
].map(convertToSymptoFormat).reverse()