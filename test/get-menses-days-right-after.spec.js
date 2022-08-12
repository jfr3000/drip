import cycleModule from '../lib/cycle'

describe('getMensesDaysRightAfter', () => {
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

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
    expect(days).toEqual([
      {
        date: '2018-05-03',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-02',
        bleeding: { value: 1 },
      },
    ])
  })

  test('works when the day is not a bleeding day', () => {
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
        bleeding: null,
      },
    ]

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[4])
    expect(days).toEqual([
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
    ])
  })

  test('ignores excluded values', () => {
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
        bleeding: { value: 1, exclude: true },
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 },
      },
      {
        date: '2018-04-30',
      },
    ]

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
    expect(days).toEqual([
      {
        date: '2018-05-03',
        bleeding: { value: 1 },
      },
    ])
  })

  test('returns empty when there are no bleeding days after', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-03',
      },
      {
        date: '2018-05-02',
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 },
      },
      {
        date: '2018-04-30',
      },
    ]

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
    expect(days).toEqual([])
  })

  test('returns empty when there are no bleeding days within threshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-03',
      },
      {
        date: '2018-05-02',
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 },
      },
      {
        date: '2018-04-30',
      },
    ]

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
    expect(days).toEqual([])
  })

  test('includes days within the treshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-05',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-03',
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

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
    expect(days).toEqual([
      {
        date: '2018-05-05',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 },
      },
    ])
  })

  describe('with cycle thresholds', () => {
    const maxBreakInBleeding = 3

    test('disregards bleeding breaks shorter than maxAllowedBleedingBreak in a bleeding period', () => {
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

      const getMensesDaysRightAfter = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding,
      }).getMensesDaysRightAfter
      const result = getMensesDaysRightAfter(bleedingDays[1])
      expect(result).toEqual([bleedingDays[0]])
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

      const getMensesDaysRightAfter = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding,
      }).getMensesDaysRightAfter
      const result = getMensesDaysRightAfter(bleedingDays[1])
      expect(result).toEqual([])
    })
  })
})
