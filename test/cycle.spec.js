import chai from 'chai'
import dirtyChai from 'dirty-chai'
import cycleModule from '../lib/cycle'

const expect = chai.expect
chai.use(dirtyChai)

describe('getCycleDayNumber', () => {
  it('works for a simple example', () => {
    const cycleStarts = [{
      date: '2018-05-09',
      isCycleStart: true,
      bleeding: {
        value: 2
      }
    }, {
      date: '2018-05-03',
      isCycleStart: true,
      bleeding: { value: 2 }
    }]
    const getCycleDayNumber = cycleModule({
      cycleStartsSortedByDate: cycleStarts
    }).getCycleDayNumber
    const targetDate = '2018-05-17'
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(9)
  })

  it('gets the correct number if the target day is not in the current cycle', () => {
    const cycleStarts = [{
      date: '2018-05-13',
      isCycleStart: true,
      bleeding: {
        value: 2
      }
    }, {
      date: '2018-04-10',
      isCycleStart: true,
      bleeding: { value: 2 }
    }]

    const targetDate = '2018-04-27'
    const getCycleDayNumber = cycleModule({
      cycleStartsSortedByDate: cycleStarts
    }).getCycleDayNumber
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(18)
  })

  it('gets the correct number if the target day is the only bleeding day', () => {
    const cycleStarts = [{
      date: '2018-05-13',
      isCycleStart: true,
      bleeding: { value: 2 }
    }]

    const targetDate = '2018-05-13'
    const getCycleDayNumber = cycleModule({
      cycleStartsSortedByDate: cycleStarts
    }).getCycleDayNumber
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(1)
  })

  it('returns null if there are no bleeding days', function () {
    const cycleStarts = []
    const targetDate = '2018-05-17'
    const getCycleDayNumber = cycleModule({
      cycleStartsSortedByDate: cycleStarts
    }).getCycleDayNumber
    const result = getCycleDayNumber(targetDate)
    expect(result).to.be.null()
  })

  it('returns null if the cycle is longer than the max', function () {
    const cycleStarts = [{
      date: '2018-05-09',
      isCycleStart: true,
      bleeding: {
        value: 2
      }
    }, {
      date: '2018-05-03',
      isCycleStart: true,
      bleeding: { value: 2 }
    }]
    // we use the default 99 days max length
    const getCycleDayNumber = cycleModule({
      cycleStartsSortedByDate: cycleStarts
    }).getCycleDayNumber
    const targetDate = '2018-08-16'
    const result = getCycleDayNumber(targetDate)
    expect(result).to.be.null()
  })
})

describe('getPreviousCycle', () => {
  it('gets previous cycle', () => {
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

    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
        return cycleStarts.includes(d.date)
      })
    })
    const result = getPreviousCycle('2018-06-08')
    expect(result).to.eql([
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
    ])
  })

  it('returns null when target day is not in a cyle', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-07-05',
      },
      {
        date: '2018-06-05',
      },
      {
        date: '2018-05-05',
      },
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-03',
      },
      {
        date: '2018-04-05',
      },
      {
        date: '2018-04-04',
        mucus: { value: 2 }
      },
      {
        date: '2018-04-03',
      },
      {
        date: '2018-04-02',
      },
    ]

    const cycleStarts = []

    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
        return cycleStarts.includes(d.date)
      })
    })
    const result = getPreviousCycle('2018-06-08')
    expect(result).to.eql(null)
  })

  it('returns null when there is no previous cycle', () => {
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

    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
        return cycleStarts.includes(d.date)
      })
    })
    const result = getPreviousCycle('2018-04-18')
    expect(result).to.eql(null)
  })

  it('returns null when the previous cycle > maxcyclelength', () => {
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

    const { getPreviousCycle } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
        return cycleStarts.includes(d.date)
      }),
      maxCycleLength: 2
    })
    const result = getPreviousCycle('2018-06-08')
    expect(result).to.eql(null)
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

    const cycleStarts = [
      '2018-07-05',
      '2018-06-05',
      '2018-05-03',
      '2018-04-02'
    ]

    const { getCyclesBefore } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
        return cycleStarts.includes(d.date)
      })
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

  it('skips cycles that are longer than max', () => {
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

    const { getCyclesBefore } = cycleModule({
      cycleDaysSortedByDate,
      cycleStartsSortedByDate: cycleDaysSortedByDate.filter(d => {
        return cycleStarts.includes(d.date)
      }),
      maxCycleLength: 30
    })
    const result = getCyclesBefore(cycleDaysSortedByDate[0])
    expect(result.length).to.eql(1)
    expect(result).to.eql([[{
      bleeding: { value: 2 },
      date: "2018-06-05"
    }]])
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
  describe('with cycle thresholds', () => {
    const maxBreakInBleeding = 3

    it('disregards bleeding breaks equal to maxAllowedBleedingBreak in a bleeding period', () => {
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

      const isMensesStart = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding
      }).isMensesStart
      const result = isMensesStart(bleedingDays[0])
      expect(result).to.be.false()
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

      const isMensesStart = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding
      }).isMensesStart
      const result = isMensesStart(bleedingDays[0])
      expect(result).to.be.true()
    })
  })
})

describe('getMensesDaysRightAfter', () => {
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

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
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

  it('works when the day is not a bleeding day', () => {
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
        bleeding: null
      }
    ]

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[4])
    expect(days).to.eql([
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

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
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

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
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

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
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

    const { getMensesDaysRightAfter } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter(d => d.bleeding)
    })
    const days = getMensesDaysRightAfter(cycleDaysSortedByDate[3])
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
  describe('with cycle thresholds', () => {
    const maxBreakInBleeding = 3

    it('disregards bleeding breaks shorter than maxAllowedBleedingBreak in a bleeding period', () => {
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

      const getMensesDaysRightAfter = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding
      }).getMensesDaysRightAfter
      const result = getMensesDaysRightAfter(bleedingDays[1])
      expect(result).to.eql([bleedingDays[0]])
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

      const getMensesDaysRightAfter = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding
      }).getMensesDaysRightAfter
      const result = getMensesDaysRightAfter(bleedingDays[1])
      expect(result).to.eql([])
    })
  })
})