import chai from 'chai'
import getCervixStatus from '../../lib/sympto/cervix'

const expect = chai.expect

function turnIntoCycleDayObject(value, fakeDate) {
  const hardAndClosed = {
    isHard: true,
    isClosed: true
  }
  const hardAndOpen = {
    isHard: true,
    isClosed: false
  }
  const softAndClosed = {
    isHard: false,
    isClosed: true
  }
  const softAndOpen = {
    isHard: false,
    isClosed: false
  }
  const cervixStates = [hardAndClosed, hardAndOpen, softAndClosed, softAndOpen]
  return {
    cervix : cervixStates[value],
    date: fakeDate
  }
}

describe('sympto', () => {
  describe('detects cervix shift', () => {
    it('when an ideal cycle happens', function () {
      const values = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 0, 0, 0, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({
        detected: true,
        cervixPeakBeforeShift: {
          date: 13,
          cervix: {
            isHard: true,
            isClosed: false
          }
        },
        evaluationCompleteDay: {
          date: 16,
          cervix: {
            isHard: true,
            isClosed: true
          }
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
          cervix: {
            isHard: false,
            isClosed: true
          }
        },
        evaluationCompleteDay: {
          date: 3,
          cervix: {
            isHard: true,
            isClosed: true
          }
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

    it('if days of hard and closed cervix are fewer than 3', function () {
      const values = [1, 3, 2, 1, 0, 2, 1, 3, 2, 0, 0, 2, 1, 3, 2, 1]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values)
      expect(status).to.eql({ detected: false })
    })
  })
})
