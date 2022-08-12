import cycleModule from '../lib/cycle'

const julyCycle = [{ date: '2018-07-05' }]
const juneCycle = [{ date: '2018-06-05' }]
const mayCycle = [
  { date: '2018-05-05' },
  { date: '2018-05-04' },
  { date: '2018-05-03' },
]
const aprilCycle = [
  { date: '2018-04-05' },
  { date: '2018-04-04' },
  { date: '2018-04-03' },
  { date: '2018-04-02' },
]

const cycleDaysSortedByDate = [
  ...julyCycle,
  ...juneCycle,
  ...mayCycle,
  ...aprilCycle,
]

const cycleStartsSortedByDate = [
  { date: '2018-07-05' },
  { date: '2018-06-05' },
  { date: '2018-05-03' },
  { date: '2018-04-02' },
]

describe('getCyclesBefore', () => {
  test('gets previous cycles', () => {
    const { getCyclesBefore } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate,
    })
    const cyclesBeforeJuly = getCyclesBefore(...julyCycle)

    expect(cyclesBeforeJuly.length).toEqual(3)
    expect(cyclesBeforeJuly).toEqual([juneCycle, mayCycle, aprilCycle])
  })

  test('skips cycles that are longer than max', () => {
    const { getCyclesBefore } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate,
      maxCycleLength: 30,
    })
    const cyclesBeforeJuly = getCyclesBefore(...julyCycle)

    expect(cyclesBeforeJuly.length).toEqual(1)
    expect(cyclesBeforeJuly).toEqual([juneCycle])
  })
})
