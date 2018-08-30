import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'
import {
  idealCycle,
  cycleWithFhmNoCervixShift,
  cycleWithoutFhm,
  cycleWithoutAnyShifts,
  tempAndCervixEvalEndOnSameDay,
  cervixShiftWaitsForTempShift,
  tempShiftWaitsForCervixShift,
  noInfertilePhaseDetected,
  fiveDayCycle
} from './cervix-temp-fixtures'

const expect = chai.expect

describe('sympto', () => {
  describe('combining temperature and cervix tracking', () => {
    describe('with no previous higher temp measurement', () => {

      it('with no temp or cervix shifts detects only peri-ovulatory', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithoutAnyShifts,
          previousCycle: cycleWithoutFhm,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(1)
        expect(status).to.eql({
          phases: {
            periOvulatory: {
              start: { date: '2018-07-01' },
              cycleDays: cycleWithoutAnyShifts
            }
          }
        })
      })

      it('with temp but no cervix shift detects only peri-ovulatory', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithFhmNoCervixShift,
          previousCycle: cycleWithoutFhm,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(1)
        expect(status).to.eql({
          phases: {
            periOvulatory: {
              start: { date: '2018-06-01' },
              cycleDays: cycleWithFhmNoCervixShift
            }
          }
        })
      })

      it('with temp and cervix shifts detects only peri- and post-ovulatory phases', function () {
        const status = getSensiplanStatus({
          cycle: idealCycle,
          previousCycle: cycleWithoutFhm,
          secondarySymptom: 'cervix'
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.cervixShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-08-01' },
          end: { date: '2018-08-11', time: '18:00' },
          cycleDays: idealCycle
            .filter(({date}) => date <= '2018-08-11')
        })
        expect(status.phases.postOvulatory).to.eql({
          start: { date: '2018-08-11', time: '18:00' },
          cycleDays: idealCycle
            .filter(({date}) => date >= '2018-08-11')
        })
      })

    })
    describe('with previous higher temp measurement', () => {

      describe('with no shifts detects only peri-ovulatory', function () {
        it.skip('according to 5-day rule', function () {
          const status = getSensiplanStatus({
            cycle: fiveDayCycle,
            previousCycle: cycleWithFhmNoCervixShift
          })

          expect(Object.keys(status.phases).length).to.eql(1)
          expect(status.phases.preOvulatory).to.eql({
            cycleDays: fiveDayCycle,
            start: { date: '2018-08-01' },
            end: { date: '2018-08-05' }
          })
        })
      })

      describe('with no shifts detects pre- and peri-ovulatory phase', () => {
        it.skip('according to 5-day-rule', function () {
          const status = getSensiplanStatus({
            cycle: cycleWithoutAnyShifts,
            previousCycle: cycleWithFhmNoCervixShift
          })

          expect(Object.keys(status.phases).length).to.eql(2)
          expect(status.phases.preOvulatory).to.eql({
            cycleDays: cycleWithoutAnyShifts
              .filter(({date}) => date <= '2018-07-05'),
            start: { date: '2018-07-01' },
            end: { date: '2018-07-05' }
          })
          expect(status.phases.periOvulatory).to.eql({
            cycleDays: cycleWithoutAnyShifts
              .filter(({date}) => date > '2018-07-05'),
            start: { date: '2018-07-06' }
          })
        })
      })

      it('with evaluation of temperature and cervix end on same day', () => {
        const status = getSensiplanStatus({
          cycle: tempAndCervixEvalEndOnSameDay,
          previousCycle: cycleWithFhmNoCervixShift,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: tempAndCervixEvalEndOnSameDay
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          end: { date: '2018-06-17', time: '18:00' },
          cycleDays: tempAndCervixEvalEndOnSameDay
            .filter(({date}) => {
              return date > '2018-06-05' && date <= '2018-06-17'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: { date: '2018-06-17', time: '18:00' },
          cycleDays: tempAndCervixEvalEndOnSameDay
            .filter(({date}) => date >= '2018-06-17')
        })
        expect(status.cervixShift.detected).to.be.true()
        expect(status.cervixShift.cervixPeak.date).to.eql('2018-06-14')
        expect(status.cervixShift.evaluationCompleteDay.date).to.eql('2018-06-17')
      })


      it('when cervix shift waits for temperature shift', () => {
        const status = getSensiplanStatus({
          cycle: cervixShiftWaitsForTempShift,
          previousCycle: cycleWithFhmNoCervixShift,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.cervixShift.detected).to.be.true()
      })

      it('when temperature shift waits for cervix shift', () => {
        const status = getSensiplanStatus({
          cycle: tempShiftWaitsForCervixShift,
          previousCycle: cycleWithFhmNoCervixShift,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.cervixShift.detected).to.be.true()
      })

      it('when no infertile phase can be detected', () => {
        const status = getSensiplanStatus({
          cycle: noInfertilePhaseDetected,
          previousCycle: cycleWithFhmNoCervixShift,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(2)
      })

    })

    it('', function () {
      const status = getSensiplanStatus({
        cycle: idealCycle,
        previousCycle: idealCycle,
        secondarySymptom: 'cervix'
      })

      expect(Object.keys(status.phases).length).to.eql()
      expect(status).to.eql({
        phases: {

        }
      })
    })

  })
})
