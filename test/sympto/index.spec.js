import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'
import {
  cycleWithoutTempShift, cycleWithTempAndMucusShift, cycleWithTempAndNoMucusShift, cycleWithTempShift, cycleWithoutAnyShifts, fiveDayCycle
} from './fixtures'

const expect = chai.expect

describe('sympto', () => {
  describe('evaluating mucus and temperature shift together', () => {
    describe('with no previous higher measurement', () => {
      it('with no shifts detects only peri-ovulatory', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithoutAnyShifts,
          previousCycle: cycleWithoutTempShift
        })

        expect(status).to.eql({
          assumeFertility: true,
          phases: {
            periOvulatory: {
              start: { date: '2018-06-01' },
              cycleDays: cycleWithoutAnyShifts
            }
          },
        })
      })

      it('with shifts detects only peri-ovulatory and post-ovulatory', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithTempAndMucusShift,
          previousCycle: cycleWithoutTempShift
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')
        expect(status.assumeFertility).to.be.false()
        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: cycleWithTempAndMucusShift.slice(0, 21)
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: cycleWithTempAndMucusShift.slice(20)
        })
      })
    })
  })
  describe('with previous higher measurement', () => {
    describe('with no shifts detects pre-ovulatory phase', function () {
      it('according to 5-day-rule', function () {
        const status = getSensiplanStatus({
          cycle: fiveDayCycle,
          previousCycle: cycleWithTempShift
        })

        expect(Object.keys(status.phases).length).to.eql(1)
        expect(status.assumeFertility).to.be.false()
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: fiveDayCycle,
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' }
        })
      })

    })
    describe('with no shifts detects pre- and peri-ovulatory phase', function () {
      it('according to 5-day-rule', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithTempAndNoMucusShift,
          previousCycle: cycleWithTempShift
        })

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.assumeFertility).to.be.true()
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: cycleWithTempAndNoMucusShift.slice(0,5),
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: cycleWithTempAndNoMucusShift.slice(5),
          start: { date: '2018-06-06' }
        })
      })

    })
    describe('with shifts detects pre- and peri-ovulatory phase', function () {
      it('according to 5-day-rule', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithTempAndMucusShift,
          previousCycle: cycleWithTempShift
        })

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.assumeFertility).to.be.false()
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: cycleWithTempAndMucusShift.slice(0,5),
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: cycleWithTempAndMucusShift.slice(5, 21),
          start: { date: '2018-06-06' },
          end: { date: '2018-06-21', time: '18:00'}
        })
        expect(status.phases.postOvulatory).to.eql({
          cycleDays: cycleWithTempAndMucusShift.slice(20),
          start: { date: '2018-06-21', time: '18:00'}
        })
      })

    })
  })
})