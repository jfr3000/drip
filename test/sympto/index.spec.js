import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'
import { AssertionError } from 'assert'
import {
  cycleWithoutTempShift,
  cycleWithTempAndMucusShift,
  cycleWithTempAndNoMucusShift,
  cycleWithTempShift,
  cycleWithoutAnyShifts,
  fiveDayCycle,
  cycleWithEarlyMucus,
  mucusPeakAndFhmOnSameDay,
  fhmTwoDaysBeforeMucusPeak,
  fhm5DaysAfterMucusPeak,
  mucusPeak5DaysAfterFhm,
  mucusPeakTwoDaysBeforeFhm,
  fhmOnDay12
} from './fixtures'

const expect = chai.expect

describe('sympto', () => {
  describe('with no previous higher measurement', () => {
    it('with no shifts detects only peri-ovulatory', function () {
      const status = getSensiplanStatus({
        cycle: cycleWithoutAnyShifts,
        previousCycles: [cycleWithoutTempShift]
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
        previousCycles: [cycleWithoutTempShift]
      })

      expect(status.temperatureShift).to.be.an('object')
      expect(status.mucusShift).to.be.an('object')
      expect(status.assumeFertility).to.be.false()
      expect(Object.keys(status.phases).length).to.eql(2)
      expect(status.phases.periOvulatory).to.eql({
        start: { date: '2018-06-01' },
        end: { date: '2018-06-21', time: '18:00' },
        cycleDays: cycleWithTempAndMucusShift.filter(({date}) => date <= '2018-06-21')
      })
      expect(status.phases.postOvulatory).to.eql({
        start: {
          date: '2018-06-21',
          time: '18:00'
        },
        cycleDays: cycleWithTempAndMucusShift.filter(({date}) => date >= '2018-06-21')
      })
    })
  })
  describe('with previous higher measurement', () => {
    describe('with no shifts detects pre-ovulatory phase', function () {
      it('according to 5-day-rule', function () {
        const status = getSensiplanStatus({
          cycle: fiveDayCycle,
          previousCycles: [cycleWithTempShift]
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
          previousCycles: [cycleWithTempShift]
        })

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.assumeFertility).to.be.true()
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: cycleWithTempAndNoMucusShift.filter(({date}) => date <= '2018-06-05'),
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: cycleWithTempAndNoMucusShift.filter(({date}) => date > '2018-06-05'),
          start: { date: '2018-06-06' }
        })
      })
      it('according to 5-day-rule with shortened pre-phase', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithEarlyMucus,
          previousCycles: [cycleWithTempShift]
        })

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.assumeFertility).to.be.true()
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: [cycleWithEarlyMucus[0]],
          start: { date: '2018-06-01' },
          end: { date: '2018-06-01' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: cycleWithEarlyMucus.slice(1),
          start: { date: '2018-06-02' }
        })
      })
    })
    describe('with shifts detects pre- and peri-ovulatory phase', function () {
      it('according to 5-day-rule', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithTempAndMucusShift,
          previousCycles: [cycleWithTempShift]
        })

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.assumeFertility).to.be.false()
        expect(status.phases.preOvulatory).to.eql({
          cycleDays: cycleWithTempAndMucusShift.filter(({date}) => date <= '2018-06-05'),
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' }
        })
        expect(status.phases.periOvulatory).to.eql({
          cycleDays: cycleWithTempAndMucusShift.filter(({date}) => date > '2018-06-05' && date <= '2018-06-21'),
          start: { date: '2018-06-06' },
          end: { date: '2018-06-21', time: '18:00'}
        })
        expect(status.phases.postOvulatory).to.eql({
          cycleDays: cycleWithTempAndMucusShift.filter(({date}) => date >= '2018-06-21'),
          start: { date: '2018-06-21', time: '18:00'}
        })
      })

    })
  })

  describe('combining first higher measurment and mucus peak', () => {
    it('with fhM + mucus peak on same day finds correct start of post-ovu phase', () => {
      const status = getSensiplanStatus({
        cycle: mucusPeakAndFhmOnSameDay,
        previousCycles: [cycleWithTempShift]
      })

      expect(status.temperatureShift).to.be.an('object')
      expect(status.mucusShift).to.be.an('object')
      expect(status.assumeFertility).to.be.false()
      expect(Object.keys(status.phases).length).to.eql(3)
      expect(status.phases.preOvulatory).to.eql({
        start: { date: '2018-06-01' },
        end: { date: '2018-06-05' },
        cycleDays: mucusPeakAndFhmOnSameDay.filter(({date}) => date <= '2018-06-05')
      })
      expect(status.phases.periOvulatory).to.eql({
        start: { date: '2018-06-06' },
        end: { date: '2018-06-21', time: '18:00' },
        cycleDays: mucusPeakAndFhmOnSameDay.filter(({date}) => {
          return date > '2018-06-05' && date <= '2018-06-21'
        })
      })
      expect(status.phases.postOvulatory).to.eql({
        start: {
          date: '2018-06-21',
          time: '18:00'
        },
        cycleDays: mucusPeakAndFhmOnSameDay.filter(({date}) => date >= '2018-06-21')
      })
    })

    it('with fhM 2 days before mucus peak waits for end of mucus eval', () => {
      const status = getSensiplanStatus({
        cycle: fhmTwoDaysBeforeMucusPeak,
        previousCycles: [cycleWithTempShift]
      })

      expect(status.temperatureShift).to.be.an('object')
      expect(status.mucusShift).to.be.an('object')
      expect(status.assumeFertility).to.be.false()
      expect(Object.keys(status.phases).length).to.eql(3)
      expect(status.phases.preOvulatory).to.eql({
        start: { date: '2018-06-01' },
        end: { date: '2018-06-05' },
        cycleDays: fhmTwoDaysBeforeMucusPeak.filter(({date}) => date <= '2018-06-05')
      })
      expect(status.phases.periOvulatory).to.eql({
        start: { date: '2018-06-06' },
        end: { date: '2018-06-26', time: '18:00' },
        cycleDays: fhmTwoDaysBeforeMucusPeak.filter(({date}) => {
          return date > '2018-06-05' && date <= '2018-06-26'
        })
      })
      expect(status.phases.postOvulatory).to.eql({
        start: {
          date: '2018-06-26',
          time: '18:00'
        },
        cycleDays: fhmTwoDaysBeforeMucusPeak.filter(({date}) => date >= '2018-06-26')
      })
    })

    it('with another mucus peak 5 days after fHM ignores it', () => {
      const status = getSensiplanStatus({
        cycle: mucusPeak5DaysAfterFhm,
        previousCycles: [cycleWithTempShift]
      })

      expect(status.temperatureShift).to.be.an('object')
      expect(status.mucusShift).to.be.an('object')
      expect(status.assumeFertility).to.be.false()
      expect(Object.keys(status.phases).length).to.eql(3)
      expect(status.phases.preOvulatory).to.eql({
        start: { date: '2018-06-01' },
        end: { date: '2018-06-01' },
        cycleDays: mucusPeak5DaysAfterFhm.filter(({date}) => date <= '2018-06-01')
      })
      expect(status.phases.periOvulatory).to.eql({
        start: { date: '2018-06-02' },
        end: { date: '2018-06-22', time: '18:00' },
        cycleDays: mucusPeak5DaysAfterFhm.filter(({date}) => {
          return date > '2018-06-01' && date <= '2018-06-22'
        })
      })
      expect(status.phases.postOvulatory).to.eql({
        start: {
          date: '2018-06-22',
          time: '18:00'
        },
        cycleDays: mucusPeak5DaysAfterFhm.filter(({date}) => date >= '2018-06-22')
      })
    })

    it('with mucus peak 2 days before fhM waits for end of temp eval', () => {
      const status = getSensiplanStatus({
        cycle:  mucusPeakTwoDaysBeforeFhm,
        previousCycles: [cycleWithTempShift]
      })

      expect(status.temperatureShift).to.be.an('object')
      expect(status.mucusShift).to.be.an('object')
      expect(status.assumeFertility).to.be.false()
      expect(Object.keys(status.phases).length).to.eql(3)
      expect(status.phases.preOvulatory).to.eql({
        start: { date: '2018-06-01' },
        end: { date: '2018-06-04' },
        cycleDays: mucusPeakTwoDaysBeforeFhm.filter(({date}) => date <= '2018-06-04')
      })
      expect(status.phases.periOvulatory).to.eql({
        start: { date: '2018-06-05' },
        end: { date: '2018-07-03', time: '18:00' },
        cycleDays: mucusPeakTwoDaysBeforeFhm.filter(({date}) => {
          return date > '2018-06-04' && date <= '2018-07-03'
        })
      })
      expect(status.phases.postOvulatory).to.eql({
        start: {
          date: '2018-07-03',
          time: '18:00'
        },
        cycleDays: mucusPeakTwoDaysBeforeFhm.filter(({date}) => date >= '2018-07-03')
      })
    })

    it('with mucus peak 5 days before fhM waits for end of temp eval', () => {
      const status = getSensiplanStatus({
        cycle:  fhm5DaysAfterMucusPeak,
        previousCycles: [cycleWithTempShift]
      })

      expect(status.temperatureShift).to.be.an('object')
      expect(status.mucusShift).to.be.an('object')
      expect(status.assumeFertility).to.be.false()
      expect(Object.keys(status.phases).length).to.eql(3)
      expect(status.phases.preOvulatory).to.eql({
        start: { date: '2018-06-01' },
        end: { date: '2018-06-05' },
        cycleDays: fhm5DaysAfterMucusPeak.filter(({date}) => date <= '2018-06-05')
      })
      expect(status.phases.periOvulatory).to.eql({
        start: { date: '2018-06-06' },
        end: { date: '2018-06-21', time: '18:00' },
        cycleDays: fhm5DaysAfterMucusPeak.filter(({date}) => {
          return date > '2018-06-05' && date <= '2018-06-21'
        })
      })
      expect(status.phases.postOvulatory).to.eql({
        start: {
          date: '2018-06-21',
          time: '18:00'
        },
        cycleDays: fhm5DaysAfterMucusPeak.filter(({date}) => date >= '2018-06-21')
      })
    })
  })

  describe('applying the minus-8 rule', () => {
    it('shortens the pre-ovu phase if there is a previous <13 fhm', () => {
      const status = getSensiplanStatus({
        cycle:  cycleWithTempAndMucusShift,
        previousCycles: [fhmOnDay12, cycleWithTempShift]
      })

      expect(status.temperatureShift).to.be.an('object')
      expect(status.mucusShift).to.be.an('object')
      expect(status.assumeFertility).to.be.false()
      expect(Object.keys(status.phases).length).to.eql(3)
      expect(status.phases.preOvulatory).to.eql({
        start: { date: '2018-06-01' },
        end: { date: '2018-06-04' },
        cycleDays: fhm5DaysAfterMucusPeak.filter(({date}) => date <= '2018-06-04')
      })
      expect(status.phases.periOvulatory).to.eql({
        start: { date: '2018-06-05' },
        end: { date: '2018-06-17', time: '18:00' },
        cycleDays: fhm5DaysAfterMucusPeak.filter(({date}) => {
          return date > '2018-06-04' && date <= '2018-06-17'
        })
      })
      expect(status.phases.postOvulatory).to.eql({
        start: {
          date: '2018-06-17',
          time: '18:00'
        },
        cycleDays: fhm5DaysAfterMucusPeak.filter(({date}) => date >= '2018-06-17')
      })
    })
    it('shortens the pre-ovu phase if there is a previous <13 fhm with less than 12 cycles')
    it('shortens the pre-ovu phase if mucus occurs')
    it('lengthens the pre-ovu phase if >= 12 cycles')
    it('does not lengthen the pre-ovu phase if < 12 cycles')
    it('does not lengthen the pre-ovu phase if < 12 cycles')
  })

  describe('when args are wrong', () => {
    it('throws when arg object is not in right format', () => {
      const wrongObject = { hello: 'world' }
      expect(() => getSensiplanStatus(wrongObject)).to.throw(AssertionError)
    })
    it('throws if cycle array is empty', () => {
      expect(() => getSensiplanStatus({cycle: []})).to.throw(AssertionError)
    })
    it('throws if cycle days are not in right format', () => {
      expect(() => getSensiplanStatus({
        cycle: [{
          hello: 'world',
          bleeding: { value: 0 }
        }],
        previousCycles: [[{
          date: '1992-09-09',
          bleeding: { value: 0 }
        }]]
      })).to.throw(AssertionError)
      expect(() => getSensiplanStatus({
        cycle: [{
          date: '2018-04-13',
          temperature: {value: '35'},
          bleeding: { value: 0 }
        }],
        previousCycles: [[{
          date: '1992-09-09',
          bleeding: { value: 0 }
        }]]
      })).to.throw(AssertionError)
      expect(() => getSensiplanStatus({
        cycle: [{
          date: '09-14-2017',
          bleeding: { value: 0 }
        }],
        previousCycles: [[{
          date: '1992-09-09',
          bleeding: { value: 0 }
        }]]
      })).to.throw(AssertionError)
    })
    it('throws if first cycle day does not have bleeding value', () => {
      expect(() => getSensiplanStatus({
        cycle: [{
          date: '2017-01-01',
          bleeding: {
            value: 'medium'
          }
        }],
        previousCycles: [[
          {
            date: '2017-09-23',
          }
        ]]
      })).to.throw(AssertionError)
    })
  })
})