import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'
import {
  cycleWithoutTempShift,
  cycleWithTempAndMucusShift,
  cycleWithTempAndNoMucusShift,
  cycleWithTempShift,
  cycleWithoutAnyShifts,
  fiveDayCycle,
  cycleWithEarlyMucus
} from './fixtures'

const expect = chai.expect

describe('sympto', () => {
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
          previousCycle: cycleWithTempShift
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
          previousCycle: cycleWithTempShift
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
  describe('when args are wrong', () => {
    it('throws when arg object is not in right format', () => {
      const wrongObject = { hello: 'world' }
      expect(() => getSensiplanStatus(wrongObject)).to.throw('cycle days as array')
    })
    it('throws if cycle array is empty', () => {
      expect(() => getSensiplanStatus({cycle: []})).to.throw('cycle days as array')
    })
    it('throws if cycle days are not in right format', () => {
      expect(() => getSensiplanStatus({
        cycle: [{
          hello: 'world',
          bleeding: { value: 0 }
        }],
        previousCycle: [{
          date: '1992-09-09',
          bleeding: { value: 0 }
        }]
      })).to.throw('correct format')
      expect(() => getSensiplanStatus({
        cycle: [{
          date: '2018-04-13',
          temperature: {value: '35'},
          bleeding: { value: 0 }
        }],
        previousCycle: [{
          date: '1992-09-09',
          bleeding: { value: 0 }
        }]
      })).to.throw('correct format')
      expect(() => getSensiplanStatus({
        cycle: [{
          date: '09-14-2017',
          bleeding: { value: 0 }
        }],
        previousCycle: [{
          date: '1992-09-09',
          bleeding: { value: 0 }
        }]
      })).to.throw('ISO')
    })
    it('throws if first cycle day does not have bleeding value', () => {
      expect(() => getSensiplanStatus({
        cycle: [{
          date: '2017-01-01',
          bleeding: {
            value: 'medium'
          }
        }],
        previousCycle: [
          {
            date: '2017-09-23',
          }
        ]
      })).to.throw('start with bleeding')
    })
  })
})