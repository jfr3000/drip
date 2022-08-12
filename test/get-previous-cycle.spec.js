import cycleModule from '../lib/cycle'

const mayCycle = [
  { date: '2018-05-05' },
  { date: '2018-05-04' },
  { date: '2018-05-03' },
]

const cycleDaysSortedByDate = [
  { date: '2018-07-05' },
  { date: '2018-06-05' },
  ...mayCycle,
  { date: '2018-04-05' },
  { date: '2018-04-04' },
  { date: '2018-04-03' },
  { date: '2018-04-02' },
]

const cycleStartsSortedByDate = [
  { date: '2018-07-05' },
  { date: '2018-06-05' },
  { date: '2018-05-03' },
  { date: '2018-04-02' },
]

describe('getPreviousCycle', () => {
  test('gets previous cycle', () => {
    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate,
    })

    expect(getPreviousCycle('2018-06-08')).toEqual(mayCycle)
  })

  test('returns null when target day is not in a cyle', () => {
    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: [],
    })

    expect(getPreviousCycle('2018-06-08')).toEqual(null)
  })

  test('returns null when there is no previous cycle', () => {
    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate,
    })

    expect(getPreviousCycle('2018-04-18')).toEqual(null)
  })

  test('returns null when the previous cycle > maxcyclelength', () => {
    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate,
      maxCycleLength: 2,
    })

    expect(getPreviousCycle('2018-06-08')).toEqual(null)
  })
})
