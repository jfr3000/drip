import chai from 'chai'
import { detectTemperatureShift } from '../lib/sensiplan'

const expect = chai.expect

describe.only('sensiplan', () => {
  describe('getTemperatureStatus', () => {
    describe('regular rule', () => {
      it('reports lower temperature status before shift', function () {
        const lowerTemps = [36.7, 36.57, 36.47, 36.49, 36.57]
        const status = detectTemperatureShift(lowerTemps)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55],
          ltl: 36.7,
          high: [],
          shiftDetected: false
        })
      })

      it('detects temperature shift correctly', function () {
        const tempShift = [36.7, 36.57, 36.47, 36.49, 36.57, 36.62, 36.55, 36.8, 36.86, 36.8]
        const status = detectTemperatureShift(tempShift)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55, 36.6, 36.55],
          ltl: 36.6,
          high: [36.8, 36.85, 36.8],
          shiftDetected: true
        })
      })

      it('detects missing temperature shift correctly', function () {
        const noTempShift = [36.7, 36.57, 36.47, 36.49, 36.57, 36.62, 36.55, 36.8, 36.86, 36.77]
        const status = detectTemperatureShift(noTempShift)
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
        const firstException = [36.7, 36.57, 36.47, 36.49, 36.57, 36.62, 36.55, 36.8, 36.86, 36.77, 36.63]
        const status = detectTemperatureShift(firstException)
        expect(status).to.eql({
          low: [36.7, 36.55, 36.45, 36.5, 36.55, 36.6, 36.55],
          ltl: 36.6,
          high: [36.8, 36.85, 36.75, 36.65],
          shiftDetected: true
        })
      })

      it('detects missing temperature shift correctly', function () {
        const firstExceptionNoShift = [36.7, 36.57, 36.47, 36.49, 36.57, 36.62, 36.55, 36.8, 36.86, 36.77, 36.57]
        const status = detectTemperatureShift(firstExceptionNoShift)
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