import chai from 'chai'
import dirtyChai from 'dirty-chai'
import cycleModule from '../lib/cycle'
import { LocalDate } from 'js-joda'

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

describe('getPredictedMenses', () => {
  describe('cannot predict next menses', () => {
    it('if no bleeding is documented', () => {
      const cycleDaysSortedByDate = [ {} ]

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding),
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

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding),
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

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
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

      const { getPredictedMenses } = cycleModule({
        cycleDaysSortedByDate,
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding),
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
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
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
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
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
        bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
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

describe('getAllMensesStart', () => {
  it('works for one cycle start', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-01',
        bleeding: { value: 1 }
      }
    ]

    const { getAllMensesStarts } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const result = getAllMensesStarts()
    expect(result.length).to.eql(1)
    expect(result).to.eql(['2018-05-01'])
  }),
  it('works for two cycle starts', () => {
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
      }
    ]

    const { getAllMensesStarts } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const result = getAllMensesStarts()
    expect(result.length).to.eql(2)
    expect(result).to.eql(['2018-06-01', '2018-05-01'])
  })

  it('works for two cycle starts with excluded data', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
        bleeding: { value: 2 }
      },
      {
        date: '2018-05-01',
        bleeding: { value: 2 }
      },
      {
        date: '2018-04-31',
        bleeding: { value: 2 , exclude: true}
      },
    ]

    const { getAllMensesStarts } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const result = getAllMensesStarts()
    expect(result.length).to.eql(2)
    expect(result).to.eql(['2018-06-01', '2018-05-01'])
  })

  it('returns an empty array if no bleeding days are given', () => {
    const cycleDaysSortedByDate = [ {} ]

    const { getAllMensesStarts } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const result = getAllMensesStarts()
    expect(result.length).to.eql(0)
    expect(result).to.eql([])
  })

  it('is not slow with 500 menses starts', () => {
    const startDate = LocalDate.parse('2018-10-01')
    const cycleDaysSortedByDate = Array(500)
      .fill(null)
      .map((_, i) => {
        return {
          date: startDate.minusMonths(i).toString(),
          bleeding: { value: 2 }
        }
      })
    const { getAllMensesStarts } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate
    })
    const start = Date.now()
    const result = getAllMensesStarts()
    const duration = Date.now() - start
    expect(result.length).to.eql(500)
    expect(duration).to.be.lessThan(100)
  })
})

describe('isMensesStart', () => {
  it('works for simple menses start', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-02',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 }
      },
      {
        date: '2018-04-30',
      }
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const start = isMensesStart(cycleDaysSortedByDate[3])
    expect(start).to.be.true()
    expect(isMensesStart(cycleDaysSortedByDate[0])).to.be.false()
    expect(isMensesStart(cycleDaysSortedByDate[1])).to.be.false()
    expect(isMensesStart(cycleDaysSortedByDate[2])).to.be.false()
    expect(isMensesStart(cycleDaysSortedByDate[4])).to.be.false()
  })

  it('works with previous excluded value', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
        bleeding: { value: 2 }
      },
      {
        date: '2018-05-01',
        bleeding: { value: 2 }
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2 , exclude: true}
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const start = isMensesStart(cycleDaysSortedByDate[1])
    expect(start).to.be.true()
    const notStart = isMensesStart(cycleDaysSortedByDate[2])
    expect(notStart).to.be.false()
  })

  it('returns false when day has no bleeding', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
      },
      {
        date: '2018-05-01',
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2 , exclude: true}
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const start = isMensesStart(cycleDaysSortedByDate[0])
    expect(start).to.be.false()
  })

  it('returns false when there is a previous bleeding day within the threshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
      },
      {
        date: '2018-05-01',
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2 }
      },
      {
        date: '2018-04-29'
      },
      {
        date: '2018-04-28',
        bleeding: { value: 2 }
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const start = isMensesStart(cycleDaysSortedByDate[2])
    expect(start).to.be.false()
  })

  it('returns true when there is a previous excluded bleeding day within the threshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
      },
      {
        date: '2018-05-01',
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2 }
      },
      {
        date: '2018-04-29'
      },
      {
        date: '2018-04-28',
        bleeding: { value: 2 , exclude: true}
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const start = isMensesStart(cycleDaysSortedByDate[2])
    expect(start).to.be.true()
  })
})

describe('getMensesDaysAfter', () => {
  it('works for simple menses start', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-02',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 }
      },
      {
        date: '2018-04-30',
      }
    ]

    const { getMensesDaysAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysAfter(cycleDaysSortedByDate[3])
    expect(days).to.eql([
      {
        date: '2018-05-03',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-02',
        bleeding: { value: 1 }
      }
    ])
  })

  it('ignores excluded values', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-02',
        bleeding: { value: 1, exclude: true }
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 }
      },
      {
        date: '2018-04-30',
      }
    ]

    const { getMensesDaysAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysAfter(cycleDaysSortedByDate[3])
    expect(days).to.eql([
      {
        date: '2018-05-03',
        bleeding: { value: 1 }
      }
    ])
  })

  it('returns empty when there are no bleeding days after', () => {
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
        bleeding: { value: 1 }
      },
      {
        date: '2018-04-30',
      }
    ]

    const { getMensesDaysAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysAfter(cycleDaysSortedByDate[3])
    expect(days).to.eql([])
  })

  it('returns empty when there are no bleeding days within threshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-03',
      },
      {
        date: '2018-05-02',
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 }
      },
      {
        date: '2018-04-30',
      }
    ]

    const { getMensesDaysAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysAfter(cycleDaysSortedByDate[3])
    expect(days).to.eql([])
  })

  it('includes days within the treshold', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-05',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 }
      },
      {
        date: '2018-04-30',
      }
    ]

    const { getMensesDaysAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysAfter(cycleDaysSortedByDate[3])
    expect(days).to.eql([
      {
        date: '2018-05-05',
        bleeding: { value: 1 }
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 }
      }
    ])
  })
})