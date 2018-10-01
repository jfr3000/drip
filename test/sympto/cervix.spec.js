import chai from 'chai'
import getCervixStatus from '../../lib/sympto/cervix'

const expect = chai.expect

function turnIntoCycleDayObject(value, fakeDate) {
  const hardAndClosed = {
    opening: 0,
    firmness: 0
  }
  const hardAndOpen = {
    opening: 1,
    firmness: 0
  }
  const softAndClosed = {
    opening: 0,
    firmness: 1
  }
  const softAndOpen = {
    opening: 1,
    firmness: 1
  }
  const cervixStates = [hardAndClosed, hardAndOpen, softAndClosed, softAndOpen]
  return {
    date: fakeDate,
    cervix: {
      opening: cervixStates[value].opening,
      firmness: cervixStates[value].firmness,
      exclude: false
    }
  }
}

describe('sympto', () => {
  describe('detects cervix shift', () => {
    it('when shift happens at day 13 with consistent following days of infertile cervix until tempEvalEnd', () => {
      const values = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 16)
      expect(status).to.eql({
        detected: true,
        cervixPeakBeforeShift: {
          date: 10,
          cervix: {
            opening: 1,
            firmness: 1,
            exclude: false
          }
        },
        evaluationCompleteDay: {
          date: 13,
          cervix: {
            opening: 0,
            firmness: 0,
            exclude: false
          }
        }
      })
    })
    it('right at the start of cycle days even if later shift happens again because tempEvalEnd happened before second potential shift', () => {
      const values = [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 5)
      expect(status).to.eql({
        detected: true,
        cervixPeakBeforeShift: {
          date: 0,
          cervix: {
            opening: 0,
            firmness: 1,
            exclude: false
          },
        },
        evaluationCompleteDay: {
          date: 3,
          cervix: {
            opening: 0,
            firmness: 0,
            exclude: false
          }
        }
      })
    })
    it('at day 6 although right at the start of cycle days a potential shift happened but because tempEvalEnd happens after second shift', () => {
      const values = [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 10)
      expect(status).to.eql({
        detected: true,
        cervixPeakBeforeShift: {
          date: 6,
          cervix: {
            opening: 1,
            firmness: 0,
            exclude: false
          },
        },
        evaluationCompleteDay: {
          date: 9,
          cervix: {
            opening: 0,
            firmness: 0,
            exclude: false
          }
        }
      })
    })
  })

  describe('detects no cervix shift', () => {
    it('if there are less than 3 days closed and hard cervix', () => {
      const values = [0, 0, 0, 1, 1, 1, 2, 0, 3, 3, 3, 1, 1, 1, 0, 0, 2, 0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 15)
      expect(status).to.eql({ detected: false })
    })
    it('if cycleDays have not enough cervix values to detect valid cervix shift', () => {
      const values = [2,0,0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 17)
      expect(status).to.eql({ detected: false })
    })
    it('when the cervix shift is happening after tempEvalEnd', () => {
      const values = [1,1,1,1,1,2,3,3,3,3,1,1,1,1,0,0,0,0,0,0,0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 10)
      expect(status).to.eql({ detected: false })
    })
    it('if no days indicate fertile cervix which could be cervix peak', () => {
      const values = [1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1, 3, 2, 1]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 12)
      expect(status).to.eql({ detected: false })
    })
    it('if all days indicate infertile cervix values', () => {
      const values = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        .map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 9)
      expect(status).to.eql({ detected: false })
    })
    it('if there are no cervix values', () => {
      const values = [].map(turnIntoCycleDayObject)
      const status = getCervixStatus(values, 15)
      expect(status).to.eql({ detected: false })
    })
  })
})
