import chai from 'chai'
import dirtyChai from 'dirty-chai'
import cycleModule from '../lib/cycle'

const { expect } = chai
chai.use(dirtyChai)

const simpleCycleStarts = [
  { date: '2018-05-09' },
  { date: '2018-05-03'},
]

describe('getCycleDayNumber', () => {
  it('works for a date in the current cycle', () => {
    const cycleStartsSortedByDate = simpleCycleStarts
    const date = '2018-05-17'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).to.eql(9)
  })

  it('works for a date which is not in the current cycle', () => {
    const cycleStartsSortedByDate = [
      { date: '2018-05-13' },
      { date: '2018-04-10'}
    ]
    const date = '2018-04-27'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).to.eql(18)
  })

  it('works for a date which is the first and only day in cycle', () => {
    const cycleStartsSortedByDate = [
      { date: '2018-05-13' }
    ]
    const date = '2018-05-13'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).to.eql(1)
  })

  it('returns null if there are no cycle starts', function () {
    const cycleStartsSortedByDate = []
    const date = '2018-05-17'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).to.be.null()
  })

  it('returns null if the cycle is longer than the max', function () {
    const cycleStartsSortedByDate = simpleCycleStarts
    // we use the default 99 days max length
    const date = '2018-08-16'
    const { getCycleDayNumber } = cycleModule({ cycleStartsSortedByDate })

    expect(getCycleDayNumber(date)).to.be.null()
  })
})
