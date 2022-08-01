import { expect } from 'chai'
import cycleModule from '../lib/cycle'

describe('isMensesStart', () => {
  it('works for simple menses start', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-05-04',
      },
      {
        date: '2018-05-03',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-02',
        bleeding: { value: 1 },
      },
      {
        date: '2018-05-01',
        bleeding: { value: 1 },
      },
      {
        date: '2018-04-30',
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[3])
    expect(start).to.be.true
    expect(isMensesStart(cycleDaysSortedByDate[0])).to.be.false
    expect(isMensesStart(cycleDaysSortedByDate[1])).to.be.false
    expect(isMensesStart(cycleDaysSortedByDate[2])).to.be.false
    expect(isMensesStart(cycleDaysSortedByDate[4])).to.be.false
  })

  it('works with previous excluded value', () => {
    const cycleDaysSortedByDate = [
      {
        date: '2018-06-01',
        bleeding: { value: 2 },
      },
      {
        date: '2018-05-01',
        bleeding: { value: 2 },
      },
      {
        date: '2018-04-30',
        bleeding: { value: 2, exclude: true },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[1])
    expect(start).to.be.true
    const notStart = isMensesStart(cycleDaysSortedByDate[2])
    expect(notStart).to.be.false
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
        bleeding: { value: 2, exclude: true },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[0])
    expect(start).to.be.false
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
        bleeding: { value: 2 },
      },
      {
        date: '2018-04-29',
      },
      {
        date: '2018-04-28',
        bleeding: { value: 2 },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[2])
    expect(start).to.be.false
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
        bleeding: { value: 2 },
      },
      {
        date: '2018-04-29',
      },
      {
        date: '2018-04-28',
        bleeding: { value: 2, exclude: true },
      },
    ]

    const { isMensesStart } = cycleModule({
      cycleDaysSortedByDate,
      bleedingDaysSortedByDate: cycleDaysSortedByDate.filter((d) => d.bleeding),
    })
    const start = isMensesStart(cycleDaysSortedByDate[2])
    expect(start).to.be.true
  })
  describe('with cycle thresholds', () => {
    const maxBreakInBleeding = 3

    it('disregards bleeding breaks equal to maxAllowedBleedingBreak in a bleeding period', () => {
      const bleedingDays = [
        {
          date: '2018-05-14',
          bleeding: {
            value: 2,
          },
        },
        {
          date: '2018-05-10',
          bleeding: {
            value: 2,
          },
        },
      ]

      const isMensesStart = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding,
      }).isMensesStart
      const result = isMensesStart(bleedingDays[0])
      expect(result).to.be.false
    })

    it('counts bleeding breaks longer than maxAllowedBleedingBreak in a bleeding period', () => {
      const bleedingDays = [
        {
          date: '2018-05-14',
          bleeding: {
            value: 2,
          },
        },
        {
          date: '2018-05-09',
          bleeding: {
            value: 2,
          },
        },
      ]

      const isMensesStart = cycleModule({
        bleedingDaysSortedByDate: bleedingDays,
        maxBreakInBleeding,
      }).isMensesStart
      const result = isMensesStart(bleedingDays[0])
      expect(result).to.be.true
    })
  })
})
