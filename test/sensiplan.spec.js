import chai from 'chai'
import { getTemperatureStatus } from '../lib/sensiplan'
import tempShift from './fixtures/temp-shift.json'
import lowerTempDays from './fixtures/lower-temps.json'

const expect = chai.expect

describe.only('sensiplan', () => {
  describe('getTemperatureStatus', () => {
    it('reports lower temperature status before shift', function () {
      const status = getTemperatureStatus('2018-06-09', lowerTempDays)
      expect(status).to.eql({
        low: [36.7, 36.55, 36.45, 36.5, 36.55],
        ltl: 36.7,
        high: [],
        shiftDetected: false
      })
    })

    it('detects temperature shift', function () {
      const status = getTemperatureStatus('2018-06-14', tempShift)
      expect(status).to.eql({
        low: [36.7, 36.55, 36.45, 36.5, 36.55, 36.6, 36.55],
        ltl: 36.6,
        high: [36.8, 36.85, 36.8],
        shiftDetected: true
      })
    })
  })
})