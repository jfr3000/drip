import cycleModule from '../lib/cycle'

const cycleStartDay = { date: '2018-05-03' }

const cycle = [{ date: '2018-05-05' }, { date: '2018-05-04' }, cycleStartDay]

const cycleDaysSortedByDate = [
  { date: '2018-07-05' },
  { date: '2018-06-05' },
  ...cycle,
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

describe('getCycleByStartDay', () => {
  test('gets cycle by cycle start day', () => {
    const { getCycleByStartDay } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate,
    })

    expect(getCycleByStartDay(cycleStartDay)).toEqual(cycle)
  })
})
