import chai from 'chai'
import dirtyChai from 'dirty-chai'
import cycleModule from '../lib/cycle'

const expect = chai.expect
chai.use(dirtyChai)

function useBleedingDays(days) {
  return cycleModule({ bleedingDaysSortedByDate: days }).getCycleDayNumber
}

describe('getCycleDay', () => {
  it('works for a simple example', () => {
    const bleedingDays = [{
      date: '2018-05-10',
      bleeding: {
        value: 2
      }
    }, {
      date: '2018-05-09',
      bleeding: {
        value: 2
      }
    }, {
      date: '2018-05-03',
      bleeding: {
        value: 2
      }
    }]
    const getCycleDayNumber = useBleedingDays(bleedingDays)
    const targetDate = '2018-05-17'
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(9)
  })

  it('works if some bleedings are exluded', function () {
    const bleedingDays = [{
      date: '2018-05-10',
      bleeding: {
        value: 2,
        exclude: true
      }
    }, {
      date: '2018-05-09',
      bleeding: {
        value: 2,
        exclude: true
      }
    }, {
      date: '2018-05-03',
      bleeding: {
        value: 2
      }
    }]
    const targetDate = '2018-05-17'
    const getCycleDayNumber = useBleedingDays(bleedingDays)
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(15)
  })

  it('gets the correct number if the target day is not in the current cycle', () => {
    const bleedingDays = [{
      date: '2018-05-13',
      bleeding: {
        value: 2
      }
    }, {
      date: '2018-04-11',
      bleeding: {
        value: 2
      }
    }, {
      date: '2018-04-10',
      bleeding: {
        value: 2
      }
    }]

    const targetDate = '2018-04-27'
    const getCycleDayNumber = useBleedingDays(bleedingDays)
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(18)
  })

  it('gets the correct number if the target day is the only bleeding day', () => {
    const bleedingDays = [{
      date: '2018-05-13',
      bleeding: {
        value: 2
      }
    }]

    const targetDate = '2018-05-13'
    const getCycleDayNumber = useBleedingDays(bleedingDays)
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(1)
  })

  describe('getCycleDay returns null', () => {
    it('if there are no bleeding days', function () {
      const bleedingDays = []
      const targetDate = '2018-05-17'
      const getCycleDayNumber = useBleedingDays(bleedingDays)
      const result = getCycleDayNumber(targetDate)
      expect(result).to.be.null()
    })
  })

  describe('getCycleDay with cycle thresholds', () => {
    const maxBreakInBleeding = 3

    it('disregards bleeding breaks shorter than max allowed bleeding break in a bleeding period', () => {
      const bleedingDays = [{
        date: '2018-05-14',
        bleeding: {
          value: 2
        }
      }, {
        date: '2018-05-10',
        bleeding: {
          value: 2
        }
      }]

      const targetDate = '2018-05-17'
      const getCycleDayNumber = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding
      }).getCycleDayNumber
      const result = getCycleDayNumber(targetDate)
      expect(result).to.eql(8)
    })

    it('counts bleeding breaks longer than maxAllowedBleedingBreak in a bleeding period', () => {
      const bleedingDays = [{
        date: '2018-05-14',
        bleeding: {
          value: 2
        }
      }, {
        date: '2018-05-09',
        bleeding: {
          value: 2
        }
      }]
      const targetDate = '2018-05-17'
      const getCycleDayNumber = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding
      }).getCycleDayNumber
      const result = getCycleDayNumber(targetDate)
      expect(result).to.eql(4)
    })
  })
})

describe('getCyclesBefore', () => {
  it('gets previous cycles', () => {
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

    const { getCyclesBefore } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const result = getCyclesBefore(cycleDaysSortedByDate[0])
    expect(result.length).to.eql(3)
    expect(result).to.eql([
      [
        {
          date: '2018-06-05',
          bleeding: { value: 2 }
        }
      ], [
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
        }
      ], [
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
    ])
  })
})

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
  const { getCycleForDay } = cycleModule({
    cycleDaysSortedByDate,
    bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
  })

  it('gets cycle that has only one day', () => {
    const result = getCycleForDay('2018-07-05')
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

describe.only('getPredictedMenses', () => {
  describe('cannot predict next menses', () => {
    it('if no bleeding is documented', () => {
      const cycleDaysSortedByDate = [ {} ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
      })
      const result = getPredictedMenses(99, 1)
      expect(result).to.eql({})
    })
    it('if no cycle is completed', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-06-02',
          bleeding: { value: 2 }
        }
      ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
      })
      const result = getPredictedMenses(99, 1)
      expect(result).to.eql({})
    })
    it('if number of cycles is below minCyclesForPrediction', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-06-02',
          bleeding: { value: 2 }
        },
        {
          date: '2018-06-01',
          bleeding: { value: 2 }
        },
        {
          date: '2018-05-01',
          bleeding: { value: 2 }
        },
      ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
      })
      const result = getPredictedMenses()
      expect(result).to.eql({})
    })
    it('if last bleeding was more than maxCycleLength days ago', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2017-07-02',
          bleeding: { value: 2 }
        },
        {
          date: '2017-06-01',
          bleeding: { value: 2 }
        },
        {
          date: '2017-05-01',
          bleeding: { value: 2 }
        },
        {
          date: '2017-04-01',
          bleeding: { value: 2 }
        }
      ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
      })
      const result = getPredictedMenses()
      expect(result).to.eql({})
    })
  })
  describe('works', () => {
    it('if number of cycles is above minCyclesForPrediction with little standard deviation', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-08-02',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-02',
          bleeding: { value: 2 }
        },
        {
          date: '2018-06-01',
          bleeding: { value: 2 }
        },
        {
          date: '2018-05-01',
          bleeding: { value: 2 }
        },
      ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
      })
      const result = getPredictedMenses()
      const expectedResult = [
        {
          'startDate': '2018-09-01',
          'endDate': '2018-09-03'
        },
        {
          'startDate': '2018-10-02',
          'endDate': '2018-10-04'
        },
        {
          'startDate': '2018-11-02',
          'endDate': '2018-11-04'
        }
      ]
      expect(result).to.eql(expectedResult)
    })
  })
})