import chai from 'chai'
import getMucusStatus from '../../lib/sympto/mucus'

const expect = chai.expect

function turnIntoCycleDayObject(value, fakeDate) {
  return {
    mucus : { value },
    date: fakeDate
  }
}

describe('sympto', () => {
  describe('detect mucus shift', () => {
    describe('regular rule', () => {
      it('detects mucus shift correctly', function () {
        const values = [0,0,0,1,1,2,2,2,3,3,3,2,2,0,1,1,1,1,0,0,0,0,0]
          .map(turnIntoCycleDayObject)
        const status = getMucusStatus(values, 12)
        expect(status).to.eql({
          detected: true,
          mucusPeak: {
            date: 10,
            mucus: { value: 3 }
          },
          evaluationCompleteDay: {
            date: 13,
            mucus: { value: 0 }
          }
        })
      })

      it('detects no mucus shift when there are less than 3 days of lower quality', function () {
        const values = [0, 1, 1, 2, 0, 0, 1, 2, 3, 2, 3, 3, 3, 2, 2]
          .map(turnIntoCycleDayObject)
        const status = getMucusStatus(values, 30)
        expect(status).to.eql({ detected: false })
      })

      it('detects no mucus shift when there are no mucus values', function () {
        const status = getMucusStatus(Array(10).fill({
          date: 1,
          temperature: { value: 35 }
        }))
        expect(status).to.eql({ detected: false })
      })

      it('detects no mucus shift when the mucus values are all the same', function () {
        const values = [2, 2, 2, 2, 2, 2, 2, 2]
          .map(turnIntoCycleDayObject)
        const status = getMucusStatus(values, 30)
        expect(status).to.eql({ detected: false })
      })

      it('detects no mucus shift when mucus only changes from dry to nothing', function () {
        const values = [0,0,0,1,0,0,0,0,0,0,0]
          .map(turnIntoCycleDayObject)
        const status = getMucusStatus(values, 30)
        expect(status).to.eql({ detected: false })
      })

      it('ignores an early seeming shift from 0 to 1', function () {
        const values = [0,0,0,1,0,0,0,2,3,3,3,2,2,0,1,1,1,1,0,0,0,0,0]
          .map(turnIntoCycleDayObject)
        const status = getMucusStatus(values, 12)
        expect(status).to.eql({
          detected: true,
          mucusPeak: {
            date: 10,
            mucus: { value: 3 }
          },
          evaluationCompleteDay: {
            date: 13,
            mucus: { value: 0 }
          }
        })
      })
    })
  })
})