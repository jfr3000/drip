import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'
import {
  cervixShiftAndFhmOnSameDay,
  cycleWithFhmNoCervixShift,
  cycleWithoutFhm,
  longCycleWithoutAnyShifts,
  tempShift3DaysAfterCervixShift,
  cervixShift2DaysAfterTempShift,
  noOvulationDetected,
  fiveDayCycle
} from './cervix-temp-fixtures'

const expect = chai.expect

describe('sympto', () => {
  describe('combining temperature and cervix tracking', () => {
    describe('with no previous higher temp measurement', () => {
      it('with no temp or cervix shifts detects only peri-ovulatory', () => {
        const status = getSensiplanStatus({
          cycle: longCycleWithoutAnyShifts,
          previousCycle: cycleWithoutFhm,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(1)
        expect(status).to.eql({
          phases: {
            periOvulatory: {
              start: { date: '2018-07-01' },
              cycleDays: longCycleWithoutAnyShifts
            }
          }
        })
      })
      it('with temp but no cervix shift detects only peri-ovulatory', () => {
        const status = getSensiplanStatus({
          cycle: cycleWithFhmNoCervixShift,
          previousCycle: cycleWithoutFhm,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(1)
        expect(status).to.eql({
          phases: {
            periOvulatory: {
              start: { date: '2018-08-01' },
              cycleDays: cycleWithFhmNoCervixShift
            }
          }
        })
      })
      it('with temp and cervix shifts at the same day an no previous cycle detects only peri- and post-ovulatory phases', () => {
        const status = getSensiplanStatus({
          cycle: cervixShiftAndFhmOnSameDay,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.temperatureShift.evaluationCompleteDay.date).to.eql('2018-08-15')
        expect(status.cervixShift.evaluationCompleteDay.date).to.eql('2018-08-15')
        expect(status.temperatureShift.rule).to.eql(0)
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-08-01' },
          end: { date: '2018-08-15', time: '18:00' },
          cycleDays: cervixShiftAndFhmOnSameDay
            .filter(({date}) => date <= '2018-08-15')
        })
        expect(status.phases.postOvulatory).to.eql({
          start: { date: '2018-08-15', time: '18:00' },
          cycleDays: cervixShiftAndFhmOnSameDay
            .filter(({date}) => date >= '2018-08-15')
        })
      })
    })
    describe('with previous higher temp measurement', () => {
      it('with no shifts in 5-day long cycle detects only peri-ovulatory according to 5-day rule', () => {
        const status = getSensiplanStatus({
          cycle: fiveDayCycle,
          previousCycle: cervixShiftAndFhmOnSameDay,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(1)
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: fiveDayCycle,
          start: { date: '2018-08-01' },
          end: { date: '2018-08-05' }
        })
      })
      it('with no shifts in long cycle detects pre- and peri-ovulatory phase according to 5-day-rule', () => {
        const status = getSensiplanStatus({
          cycle: longCycleWithoutAnyShifts,
          previousCycle: cervixShiftAndFhmOnSameDay,
          secondarySymptom: 'cervix'
        })

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: longCycleWithoutAnyShifts
            .filter(({date}) => date <= '2018-07-05'),
          start: { date: '2018-07-01' },
          end: { date: '2018-07-05' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: longCycleWithoutAnyShifts
            .filter(({date}) => date >= '2018-07-06'),
          start: { date: '2018-07-06' }
        })
      })
      it('with temperature and cervix evaluation end on same day detects all 3 phases', () => {
        const status = getSensiplanStatus({
          cycle: cervixShiftAndFhmOnSameDay,
          previousCycle: cervixShiftAndFhmOnSameDay,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.temperatureShift.evaluationCompleteDay.date).to.eql('2018-08-15')
        expect(status.cervixShift.evaluationCompleteDay.date).to.eql('2018-08-15')

        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-08-01' },
          end: { date: '2018-08-05' },
          cycleDays: cervixShiftAndFhmOnSameDay
            .filter(({date}) => date <= '2018-08-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-08-06' },
          end: { date: '2018-08-15', time: '18:00' },
          cycleDays: cervixShiftAndFhmOnSameDay
            .filter(({date}) => {
              return date > '2018-08-05' && date <= '2018-08-15'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: { date: '2018-08-15', time: '18:00' },
          cycleDays: cervixShiftAndFhmOnSameDay
            .filter(({date}) => date >= '2018-08-15')
        })
      })
      it('with temperature shift 3 days after cervix shift detects all 3 phases', () => {
        const status = getSensiplanStatus({
          cycle: tempShift3DaysAfterCervixShift,
          previousCycle: cervixShiftAndFhmOnSameDay,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.cervixShift).to.be.an('object')
        expect(status.temperatureShift).to.be.an('object')
        expect(status.cervixShift.evaluationCompleteDay.date).to.eql('2018-05-18')
        expect(status.temperatureShift.evaluationCompleteDay.date).to.eql('2018-05-21')

        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-05-08' },
          end: { date: '2018-05-12' },
          cycleDays: tempShift3DaysAfterCervixShift
            .filter(({date}) => date <= '2018-05-12')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date:'2018-05-13'},
          end: { date: '2018-05-21', time: '18:00' },
          cycleDays: tempShift3DaysAfterCervixShift
            .filter(({date}) => {
              return date >= '2018-05-13' && date <= '2018-05-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: { date: '2018-05-21', time: '18:00' },
          cycleDays: tempShift3DaysAfterCervixShift
            .filter(({date}) => date >= '2018-05-21')
        })
      })
      it('with cervix shift 2 days after temperature shift detects all 3 phases', () => {
        const status = getSensiplanStatus({
          cycle: cervixShift2DaysAfterTempShift,
          previousCycle: cervixShiftAndFhmOnSameDay,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.temperatureShift.rule).to.eql(0)
        expect(status.temperatureShift.evaluationCompleteDay.date).to.eql('2018-04-17')
        expect(status.cervixShift.evaluationCompleteDay.date).to.eql('2018-04-19')

        expect(status.phases.preOvulatory).to.eql({
          cycleDays: cervixShift2DaysAfterTempShift
            .filter(({date}) => date <= '2018-04-09'),
          start: { date: '2018-04-05' },
          end: { date: '2018-04-09' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: cervixShift2DaysAfterTempShift
            .filter(({date}) => {
              return date >= '2018-04-10' && date <= '2018-04-19'
            }),
          start: { date: '2018-04-10' },
          end: { date: '2018-04-19', time: '18:00' }
        })
        expect(status.phases.postOvulatory).to.eql({
          cycleDays: cervixShift2DaysAfterTempShift
            .filter(({date}) => date >= '2018-04-19'),
          start: { date: '2018-04-19', time: '18:00' }
        })
      })
      it('with no shifts no ovulation is found detects only pre and peri-ovulatory phase', () => {
        const status = getSensiplanStatus({
          cycle: noOvulationDetected,
          previousCycle: cervixShiftAndFhmOnSameDay,
          secondarySymptom: 'cervix'
        })
        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: noOvulationDetected
            .filter(({date}) => date <= '2018-03-12'),
          start: { date: '2018-03-08' },
          end: { date: '2018-03-12' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: noOvulationDetected
            .filter(({date}) => date > '2018-03-12'),
          start: { date: '2018-03-13' }
        })
      })
    })
  })
})
