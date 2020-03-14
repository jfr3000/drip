import chai from 'chai'
import dirtyChai from 'dirty-chai'
import cycleModule from '../lib/cycle'

const { expect } = chai
chai.use(dirtyChai)

describe('getCycleForDay', () => {
  const cycleDaysSortedByDate = [
    {
      date: '2018-07-05',
      bleeding: { value: 2 }
    },
    {
      date: '2018-06-05',
      bleeding: { value: 2 }
    },
    {
      date: '2018-05-05',
      mucus: { value: 2 }
    },
    {
      date: '2018-05-04',
      bleeding: { value: 2 }
    },
    {
      date: '2018-05-03',
      bleeding: { value: 2 }
    },
    {
      date: '2018-04-05',
      mucus: { value: 2 }
    },
    {
      date: '2018-04-04',
      mucus: { value: 2 }
    },
    {
      date: '2018-04-03',
      mucus: { value: 2 }
    },
    {
      date: '2018-04-02',
      bleeding: { value: 2 }
    },
  ]
  const cycleStarts = [
    '2018-07-05',
    '2018-06-05',
    '2018-05-03',
    '2018-04-02'
  ]

  const { getCycleForDay } = cycleModule({
    cycleDaysSortedByDate,
    cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
      return cycleStarts.includes(d.date)
    })
  })

  it('gets cycle that has only one day', () => {
    const result = getCycleForDay('2018-07-05', '2018-08-01')
    expect(result.length).to.eql(1)
    expect(result).to.eql([
      {
        date: '2018-07-05',
        bleeding: { value: 2 }
      }
    ])
    const result2 = getCycleForDay('2018-06-05')
    expect(result2.length).to.eql(1)
    expect(result2).to.eql([
      {
        date: '2018-06-05',
        bleeding: { value: 2 }
      }
    ])
  })

  it('for later date gets cycle that has only one day', () => {
    const result = getCycleForDay('2018-06-20')
    expect(result.length).to.eql(1)
    expect(result).to.eql([
      {
        date: '2018-06-05',
        bleeding: { value: 2 }
      }
    ])
  })

  it('returns null if there is no cycle start for that date', () => {
    const result = getCycleForDay('2018-04-01')
    expect(result).to.eql(null)
  })

  it('returns null if the cycle is longer than the max', () => {
    const { getCycleForDay } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
        return cycleStarts.includes(d.date)
      }),
      maxCycleLength: 3
    })
    const result = getCycleForDay('2018-04-04')
    expect(result).to.eql(null)
  })

  it('gets cycle for day', () => {
    const result = getCycleForDay('2018-04-04')
    expect(result.length).to.eql(4)
    expect(result).to.eql([
      {
        date: '2018-04-05',
        mucus: { value: 2 }
      },
      {
        date: '2018-04-04',
        mucus: { value: 2 }
      },
      {
        date: '2018-04-03',
        mucus: { value: 2 }
      },
      {
        date: '2018-04-02',
        bleeding: { value: 2 }
      },
    ])
  })
})
