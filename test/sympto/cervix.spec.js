import chai from 'chai'
import getCervixStatus from '../../lib/sympto/cervix'

const expect = chai.expect

function turnIntoCycleDayObject(value, fakeDate) {
  const hardAndClosed = {
    value: { opening: 0, firmness: 0 }
  }
  const hardAndOpen = {
    value: { opening: 1, firmness: 0 }
  }
  const softAndClosed = {
    value: { opening: 0, firmness: 1 }
  }
  const softAndOpen = {
    value: { opening: 1,  firmness: 1 }
  }
  const cervixStates = [hardAndClosed, hardAndOpen, softAndClosed, softAndOpen]
  return {
    date: fakeDate,
    cervix: cervixStates[value],
    exclude: false
  }
}

describe('sympto', () => {
  describe('detects cervix shift', () => {
    it('when shift happens at day 15 with consistent following days', function () {
      const values = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 1, 3, 1, 0, 0, 0, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({
        detected: true,
        cervixPeakBeforeShift: {
          date: 13,
          cervix: {value: { opening: 1, firmness: 0 }},
          exclude: false
        },
        evaluationCompleteDay: {
          date: 16,
          cervix: { value: { opening: 0, firmness: 0 }},
          exclude: false
        }
      })
    })
    it('at the very first day of cycle days even if later shift happens again', function () {
      const values = [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({
        detected: true,
        cervixPeakBeforeShift: {
          date: 0,
          cervix: { value: { opening: 0, firmness: 1 } },
          exclude: false
        },
        evaluationCompleteDay: {
          date: 3,
          cervix: { value: { opening: 0, firmness: 0 } },
          exclude: false
        }
      })
    })
  })

  describe('detects no cervix shift', () => {
    it('if there are less than 3 days closed and hard cervix', function () {
      const values = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 1, 1, 1, 0, 0, 2, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({ detected: false })
    })
    it('if there are no cervix values', function () {
      const values = [].map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({ detected: false })
    })
    it('when the cervix values are all the same', function () {
      const values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({ detected: false })
    })
    it('if no days of hard and closed cervix are tracked', function () {
      const values = [1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({ detected: false })
    })
  })
})
