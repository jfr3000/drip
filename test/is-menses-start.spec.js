import cycleModule from '../lib/cycle'

describe('isMensesStart', () => {
  test('works for simple menses start', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-02',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 },
      },
      {
        date: '2018-04-30',
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[3])
    expect(start).toBeTruthy()
    expect(isMensesStart(cycleDaysSortedByDate[0])).toBeFalsy()
    expect(isMensesStart(cycleDaysSortedByDate[1])).toBeFalsy()
    expect(isMensesStart(cycleDaysSortedByDate[2])).toBeFalsy()
    expect(isMensesStart(cycleDaysSortedByDate[4])).toBeFalsy()
  })

  test('works with previous excluded value', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
        bleeding: { value: 2 },
      },
      {
        date: '2018-05-01',
        bleeding: { value: 2 },
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2, exclude: true },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[1])
    expect(start).toBeTruthy()
    const notStart = isMensesStart(cycleDaysSortedByDate[2])
    expect(notStart).toBeFalsy()
  })

  test('returns false when day has no bleeding', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
      },
      {
        date: '2018-05-01',
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2, exclude: true },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[0])
    expect(start).toBeFalsy()
  })

  test('returns false when there is a previous bleeding day within the threshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
      },
      {
        date: '2018-05-01',
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2 },
      },
      {
        date: '2018-04-29',
      },
      {
        date: '2018-04-28',
        bleeding: { value: 2 },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[2])
    expect(start).toBeFalsy()
  })

  test('returns true when there is a previous excluded bleeding day within the threshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
      },
      {
        date: '2018-05-01',
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2 },
      },
      {
        date: '2018-04-29',
      },
      {
        date: '2018-04-28',
        bleeding: { value: 2, exclude: true },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[2])
    expect(start).toBeTruthy()
  })

  describe('with cycle thresholds', () => {
    const maxBreakInBleeding = 3

    test('disregards bleeding breaks equal to maxAllowedBleedingBreak in a bleeding period', () => {
      const bleedingDays = [
        {
          date: '2018-05-14',
          bleeding: {
            value: 2,
          },
        },
        {
          date: '2018-05-10',
          bleeding: {
            value: 2,
          },
        },
      ]

      const isMensesStart = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding,
      }).isMensesStart
      const result = isMensesStart(bleedingDays[0])
      expect(result).toBeFalsy()
    })

    test('counts bleeding breaks longer than maxAllowedBleedingBreak in a bleeding period', () => {
      const bleedingDays = [
        {
          date: '2018-05-14',
          bleeding: {
            value: 2,
          },
        },
        {
          date: '2018-05-09',
          bleeding: {
            value: 2,
          },
        },
      ]

      const isMensesStart = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding,
      }).isMensesStart
      const result = isMensesStart(bleedingDays[0])
      expect(result).toBeTruthy()
    })
  })
})
