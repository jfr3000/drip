import chai from 'chai'
import dirtyChai from 'dirty-chai'

const expect = chai.expect
chai.use(dirtyChai)

import getCycleDayNumberModule from '../get-cycle-day-number'

describe('getCycleDay', () => {
  it('works for a simple example', function () {
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
    const getCycleDayNumber = getCycleDayNumberModule({bleedingDaysSortedByDate: bleedingDays})
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
    const getCycleDayNumber = getCycleDayNumberModule({bleedingDaysSortedByDate: bleedingDays})
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
    const getCycleDayNumber = getCycleDayNumberModule({bleedingDaysSortedByDate: bleedingDays})
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
    const getCycleDayNumber = getCycleDayNumberModule({bleedingDaysSortedByDate: bleedingDays})
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(1)
  })
})

describe('getCycleDay returns null', () => {
  it('if there are no bleeding days', function () {
    const bleedingDays = []
    const targetDate = '2018-05-17'
    const getCycleDayNumber = getCycleDayNumberModule({bleedingDaysSortedByDate: bleedingDays})
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
    const getCycleDayNumber = getCycleDayNumberModule({bleedingDaysSortedByDate: bleedingDays, maxBreakInBleeding })
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
    const getCycleDayNumber = getCycleDayNumberModule({bleedingDaysSortedByDate: bleedingDays, maxBreakInBleeding })
    const result = getCycleDayNumber(targetDate)
    expect(result).to.eql(4)
  })
})