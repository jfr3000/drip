import cycleModule from '../lib/cycle'

const simpleCycleStarts = [{ date: '2018-05-09' }, { date: '2018-05-03' }]

describe('getCycleDayNumber', () => {
  test('works for a date in the current cycle', () => {
    const cycleStartsSortedByDate = simpleCycleStarts
    const date = '2018-05-17'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).toEqual(9)
  })

  test('works for a date which is not in the current cycle', () => {
    const cycleStartsSortedByDate = [
      { date: '2018-05-13' },
      { date: '2018-04-10' },
    ]
    const date = '2018-04-27'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).toEqual(18)
  })

  test('works for a date which is the first and only day in cycle', () => {
    const cycleStartsSortedByDate = [{ date: '2018-05-13' }]
    const date = '2018-05-13'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).toEqual(1)
  })

  test('returns null if there are no cycle starts', function () {
    const cycleStartsSortedByDate = []
    const date = '2018-05-17'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).toBeNull()
  })

  test('returns null if the cycle is longer than the max', function () {
    const cycleStartsSortedByDate = simpleCycleStarts
    // we use the default 99 days max length
    const date = '2018-08-16'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).toBeNull()
  })
})
