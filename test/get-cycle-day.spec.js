import chai from 'chai'
import dirtyChai from 'dirty-chai'

const expect = chai.expect
chai.use(dirtyChai)

import getCycleDayNumberModule from '../get-cycle-day-number'

describe('getCycleDay', () => {
  const getCycleDayNumber = getCycleDayNumberModule()
  it('works if the last data entered is a bleeding day', function () {
    const cycleDays = [{
      date: new Date(2018, 5, 2)
    }, {
      date: new Date(2018, 5, 3),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 4)
    }, {
      date: new Date(2018, 5, 9),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 10),
      bleeding: {
        value: 2
      }
    }]
    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(9)
  })

  it('works if the last data entered is a non-bleeding day', function () {
    const cycleDays = [{
      date: new Date(2018, 5, 2)
    }, {
      date: new Date(2018, 5, 3),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 4)
    }, {
      date: new Date(2018, 5, 9),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 10),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 13)
    }, {
      date: new Date(2018, 5, 14)
    }]

    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(9)
  })

  it('works if the cycle days are not sorted by date', function () {
    const cycleDays = [{
      date: new Date(2018, 5, 13),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 9),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 3),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 4)
    }, {
      date: new Date(2018, 5, 10),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 2)
    }]

    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(5)
  })

  it('works when there are only bleeding days', function () {
    const cycleDays = [{
      date: new Date(2018, 5, 9),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 10),
      bleeding: {
        value: 2
      }
    }]
    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(9)
  })

  it('works if some bleedings are exluded', function () {
    const cycleDays = [{
      date: new Date(2018, 5, 2)
    }, {
      date: new Date(2018, 5, 3),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 4)
    }, {
      date: new Date(2018, 5, 9),
      bleeding: {
        value: 2,
        exclude: true
      }
    }, {
      date: new Date(2018, 5, 10),
      bleeding: {
        value: 2,
        exclude: true
      }
    }]
    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(15)
  })

  it('gets the correct number if the target day is not in the current cycle', () => {
    const cycleDays = [{
      date: new Date(2018, 5, 14),
    }, {
      date: new Date(2018, 5, 13),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 4, 12),
    }, {
      date: new Date(2018, 4, 11),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 4, 10),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 4, 9),
    }]

    const targetDate = new Date(2018, 4, 27)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(18)
  })
})

describe('getCycleDay returns null', () => {
  const getCycleDayNumber = getCycleDayNumberModule()
  it('if there are no bleeding days', function () {
    const cycleDays = [{
      date: new Date(2018, 5, 2)
    }, {
      date: new Date(2018, 5, 4)
    }, {
      date: new Date(2018, 5, 9),
    }, {
      date: new Date(2018, 5, 10),
    }]
    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.be.null()
  })

  it('if there are no cycle days', function () {
    const cycleDays = []
    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.be.null()
  })
})

describe('getCycleDay with cycle thresholds', () => {
  const getCycleDayNumber = getCycleDayNumberModule({
    minCycleLengthInDays: 5
  })

  it('disregards bleeding breaks shorter than the min cycle threshold in a bleeding period', () => {
    const cycleDays = [{
      date: new Date(2018, 5, 10),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 14),
      bleeding: {
        value: 2
      }
    }]

    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(8)
  })

  it('counts bleeding breaks longer than the min cycle threshold in a bleeding period', () => {
    const cycleDays = [{
      date: new Date(2018, 5, 9),
      bleeding: {
        value: 2
      }
    }, {
      date: new Date(2018, 5, 14),
      bleeding: {
        value: 2
      }
    }]
    const targetDate = new Date(2018, 5, 17)
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(4)
  })
})