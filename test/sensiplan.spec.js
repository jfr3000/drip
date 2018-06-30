import chai from 'chai'
import { getTemperatureStatus } from '../lib/sensiplan'
import tempShift from './fixtures/regular-rule-shift.json'
import noTempShift from './fixtures/regular-rule-no-shift.json'
import lowerTempDays from './fixtures/lower-temps.json'
import firstException from './fixtures/first-exception-rule.json'
import firstExceptionNoShift from './fixtures/first-exception-rule-no-shift.json'

const expect = chai.expect

describe.only('sensiplan', () => {
  describe('getTemperatureStatus', () => {
    describe('regular rule', () => {
      it('reports lower temperature status before shift', function () {
        const status = getTemperatureStatus('2018-06-09', lowerTempDays)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55],
          ltl: 36.7,
          high: [],
          shiftDetected: false
        })
      })

      it('detects temperature shift correctly', function () {
        const status = getTemperatureStatus('2018-06-14', tempShift)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55, 36.6, 36.55],
          ltl: 36.6,
          high: [36.8, 36.85, 36.8],
          shiftDetected: true
        })
      })

      it('detects missing temperature shift correctly', function () {
        const status = getTemperatureStatus('2018-06-14', noTempShift)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55, 36.6, 36.55],
          ltl: 36.6,
          high: [36.8, 36.85, 36.75],
          shiftDetected: false
        })
      })
    })

    describe('1st exception rule', () => {
      it('detects temperature shift', function () {
        const status = getTemperatureStatus('2018-06-14', firstException)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55, 36.6, 36.55],
          ltl: 36.6,
          high: [36.8, 36.85, 36.75, 36.65],
          shiftDetected: true
        })
      })

      it('detects missing temperature shift correctly', function () {
        const status = getTemperatureStatus('2018-06-14', firstExceptionNoShift)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55, 36.6, 36.55],
          ltl: 36.6,
          high: [36.8, 36.85, 36.75, 36.55],
          shiftDetected: false
        })
      })
    })
  })
})