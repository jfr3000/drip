import chai from 'chai'
import * as sensiplan from '../lib/sensiplan'
import cycleDaysFixtures from './fixtures/regular-cycles.json'

const expect = chai.expect

describe('sensiplan', () => {
  describe('getTemperatureStatus', () => {
    it('detects temperature shift', function () {
      const targetDate = '2018-06-14'
      const status = sensiplan.getTemperatureStatus(targetDate, cycleDaysFixtures)
      expect(status).to.eql({
        lowerTemps: [36.6, 36.5, 36.5, 36.6, 36.6, 36.6],
        ltl: 36.6,
        higherTemps: [36.8, 36.9, 36.8],
        shiftDetected: true
      })
    })
  })
})