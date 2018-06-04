import { expect } from 'chai'
import moment from 'moment'

import getCycleDayNumber from '../get-cycle-day-number'

describe('getCycleDay returns the cycle day', () => {
  it('if the last data entered is a bleeding day', function () {
    const cycleDays = [{
      date: moment([2018, 5, 2])
    }, {
      date: moment([2018, 5, 3]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 4])
    }, {
      date: moment([2018, 5, 9]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 10]),
      bleeding: {
        value: 2
      }
    }]
    const targetDate = moment([2018, 5, 17])
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(9)
  })

  it('if the last data entered is a non-bleeding day', function () {
    const cycleDays = [{
      date: moment([2018, 5, 2])
    }, {
      date: moment([2018, 5, 3]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 4])
    }, {
      date: moment([2018, 5, 9]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 10]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 13])
    }, {
      date: moment([2018, 5, 14])
    }]

    const targetDate = moment([2018, 5, 17])
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(9)
  })

  it('works if the cycle days are not sorted by date', function () {
    const cycleDays = [{
      date: moment([2018, 5, 13]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 9]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 3]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 4])
    }, {
      date: moment([2018, 5, 10]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 2])
    }]

    const targetDate = moment([2018, 5, 17])
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(9)
  })

  it('if there are only bleeding days', function () {
    const cycleDays = [{
      date: moment([2018, 5, 9]),
      bleeding: {
        value: 2
      }
    }, {
      date: moment([2018, 5, 10]),
      bleeding: {
        value: 2
      }
    }]
    const targetDate = moment([2018, 5, 17])
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.eql(9)
  })
})

describe('getCycleDay returns undefined', () => {
  it('if there are no bleeding days', function () {
    const cycleDays = [{
      date: moment([2018, 5, 2])
    }, {
      date: moment([2018, 5, 4])
    }, {
      date: moment([2018, 5, 9]),
    }, {
      date: moment([2018, 5, 10]),
    }]
    const targetDate = moment([2018, 5, 17])
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.be.undefined
  })

  it('if there are no cycle days', function () {
    const cycleDays = []
    const targetDate = moment([2018, 5, 17])
    const result = getCycleDayNumber(cycleDays, targetDate)
    expect(result).to.be.undefined
  })
})