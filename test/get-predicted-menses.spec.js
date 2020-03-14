import chai from 'chai'
import dirtyChai from 'dirty-chai'
import cycleModule from '../lib/cycle'

const { expect } = chai
chai.use(dirtyChai)

describe('getPredictedMenses', () => {
  describe('cannot predict next menses', () => {
    it('if no bleeding is documented', () => {
      const cycleDaysSortedByDate = [ {} ]
      const cycleStarts = []

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding),
        cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
          return cycleStarts.includes(d.date)
        }),
        maxCycleLength: 99,
        minCyclesForPrediction: 1
      })
      const result = getPredictedMenses()
      expect(result).to.eql([])
    })

    it('if one bleeding is documented (no completed cycle)', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-06-02',
          bleeding: { value: 2 }
        }
      ]
      const cycleStarts = ['2018-06-02']

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding),
        cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
          return cycleStarts.includes(d.date)
        }),
        maxCycleLength: 99,
        minCyclesForPrediction: 1
      })
      const result = getPredictedMenses()
      expect(result).to.eql([])
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
      const cycleStarts = ['2018-06-01', '2018-05-01']

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding),
        cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
          return cycleStarts.includes(d.date)
        }),
      })
      const result = getPredictedMenses()
      expect(result).to.eql([])
    })

    it('if number of cycles is below minCyclesForPrediction because one of them is too long', () => {
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
        {
          date: '2018-04-03',
          bleeding: { value: 2 }
        },
        {
          date: '2018-04-02',
          bleeding: { value: 2 }
        },
        {
          date: '2018-04-01',
          bleeding: { value: 2 }
        },
      ]
      const cycleStarts = ['2018-06-01', '2018-05-01', '2018-04-01']

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding),
        cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
          return cycleStarts.includes(d.date)
        }),
        maxCycleLength: 2
      })
      const result = getPredictedMenses()
      expect(result).to.eql([])
    })
  })
  describe('works', () => {
    it('for one completed cycle with minCyclesForPrediction = 1', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-07-15',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-01',
          bleeding: { value: 2 }
        }
      ]
      const cycleStarts = ['2018-07-15', '2018-07-01']
      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
          return cycleStarts.includes(d.date)
        }),
        minCyclesForPrediction: 1
      })
      const result = getPredictedMenses()
      const expectedResult = [
        [
          '2018-07-27',
          '2018-07-28',
          '2018-07-29',
          '2018-07-30',
          '2018-07-31'
        ],
        [
          '2018-08-10',
          '2018-08-11',
          '2018-08-12',
          '2018-08-13',
          '2018-08-14',
        ],
        [
          '2018-08-24',
          '2018-08-25',
          '2018-08-26',
          '2018-08-27',
          '2018-08-28',
        ]
      ]
      expect(result).to.eql(expectedResult)
    })

    it('if number of cycles is above minCyclesForPrediction', () => {
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
        cycleStartsSortedByDate: cycleDaysSortedByDate,
        minCyclesForPrediction: 1
      })
      const result = getPredictedMenses()
      const expectedResult = [
        [
          '2018-09-01',
          '2018-09-02',
          '2018-09-03'
        ],
        [
          '2018-10-02',
          '2018-10-03',
          '2018-10-04'
        ],
        [
          '2018-11-02',
          '2018-11-03',
          '2018-11-04'
        ]
      ]
      expect(result).to.eql(expectedResult)
    })

    it('3 cycles with little standard deviation', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-08-01',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-18',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-05',
          bleeding: { value: 2 }
        },
        {
          date: '2018-06-20',
          bleeding: { value: 2 }
        },
      ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        cycleStartsSortedByDate: cycleDaysSortedByDate
      })
      const result = getPredictedMenses()
      const expectedResult = [
        [
          '2018-08-14',
          '2018-08-15',
          '2018-08-16'
        ],
        [
          '2018-08-28',
          '2018-08-29',
          '2018-08-30'
        ],
        [
          '2018-09-11',
          '2018-09-12',
          '2018-09-13'
        ]
      ]
      expect(result).to.eql(expectedResult)
    })

    it('3 cycles with bigger standard deviation', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-08-01',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-14',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-04',
          bleeding: { value: 2 }
        },
        {
          date: '2018-06-20',
          bleeding: { value: 2 }
        },
      ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        cycleStartsSortedByDate: cycleDaysSortedByDate
      })
      const result = getPredictedMenses()
      const expectedResult = [
        [
          '2018-08-13',
          '2018-08-14',
          '2018-08-15',
          '2018-08-16',
          '2018-08-17',
        ],
        [
          '2018-08-27',
          '2018-08-28',
          '2018-08-29',
          '2018-08-30',
          '2018-08-31',
        ],
        [
          '2018-09-10',
          '2018-09-11',
          '2018-09-12',
          '2018-09-13',
          '2018-09-14',
        ]
      ]
      expect(result).to.eql(expectedResult)
    })

    it('does not count cycles longer than max', () => {
      const cycleDaysSortedByDate = [
        {
          date: '2018-08-01',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-14',
          bleeding: { value: 2 }
        },
        {
          date: '2018-07-04',
          bleeding: { value: 2 }
        },
        {
          date: '2018-06-20',
          bleeding: { value: 2 }
        },
        {
          date: '2018-04-20',
          bleeding: { value: 2 }
        },
      ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        cycleStartsSortedByDate: cycleDaysSortedByDate,
        maxCycleLength: 50
      })
      const result = getPredictedMenses()
      const expectedResult = [
        [
          '2018-08-13',
          '2018-08-14',
          '2018-08-15',
          '2018-08-16',
          '2018-08-17',
        ],
        [
          '2018-08-27',
          '2018-08-28',
          '2018-08-29',
          '2018-08-30',
          '2018-08-31',
        ],
        [
          '2018-09-10',
          '2018-09-11',
          '2018-09-12',
          '2018-09-13',
          '2018-09-14',
        ]
      ]
      expect(result).to.eql(expectedResult)
    })
  })
})
