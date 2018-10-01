import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'
import { AssertionError } from 'assert'
import {
  cycleWithoutFhm,
  longAndComplicatedCycle,
  cycleWithTempAndNoMucusShift,
  cycleWithFhm,
  cycleWithoutAnyShifts,
  fiveDayCycle,
  cycleWithEarlyMucus,
  cycleWithMucusOnFirstDay,
  mucusPeakAndFhmOnSameDay,
  mucusPeakOnLastDayOfTempEval,
  mucusPeakAfterLastDayOfTempEval,
  mucusPeakOnAndAfterLastDayOfTempEval,
  fhm5DaysAfterMucusPeak,
  mucusPeak5DaysAfterFhm,
  mucusPeakTwoDaysBeforeFhm,
  fhmOnDay12,
  fhmOnDay15,
  mucusPeakSlightlyBeforeTempShift,
  mucusOnlyAfterEndOfTempEval
} from './mucus-temp-fixtures'

const expect = chai.expect

describe('sympto', () => {
  describe('combining temperature and mucus tracking', () => {
    describe('with no previous higher temp measurement', () => {
      it('with no shifts detects only peri-ovulatory', () => {
        const status = getSensiplanStatus({
          cycle: cycleWithoutAnyShifts,
          previousCycle: cycleWithoutFhm
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-01' },
          cycleDays: cycleWithoutAnyShifts
        })
      })
      it('with temp and mucus shifts detects only peri-ovulatory and post-ovulatory', () => {
        const status = getSensiplanStatus({
          cycle: longAndComplicatedCycle,
          previousCycle: cycleWithoutFhm
        })
        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')
        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date <= '2018-06-21')
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date >= '2018-06-21')
        })

      })
    })
    describe('with previous higher measurement', () => {
      describe('with no shifts detects pre-ovulatory phase', () => {
        it('according to 5-day-rule', () => {
          const status = getSensiplanStatus({
            cycle: fiveDayCycle,
            previousCycle: cycleWithFhm
          })
          expect(Object.keys(status.phases).length).to.eql(1)
          expect(status.phases.preOvulatory).to.eql({
            cycleDays: fiveDayCycle,
            start: { date: '2018-06-01' },
            end: { date: '2018-06-05' }
          })
        })
      })
      describe('with no shifts detects pre- and peri-ovulatory phase', () => {
        it('according to 5-day-rule', () => {
          const status = getSensiplanStatus({
            cycle: cycleWithTempAndNoMucusShift,
            previousCycle: cycleWithFhm
          })
          expect(Object.keys(status.phases).length).to.eql(2)
          expect(status.phases.preOvulatory).to.eql({
            cycleDays: cycleWithTempAndNoMucusShift
              .filter(({date}) => date <= '2018-06-05'),
            start: { date: '2018-06-01' },
            end: { date: '2018-06-05' }
          })
          expect(status.phases.periOvulatory).to.eql({
            cycleDays: cycleWithTempAndNoMucusShift
              .filter(({date}) => date > '2018-06-05'),
            start: { date: '2018-06-06' }
          })
        })
        it('according to 5-day-rule with shortened pre-phase', () => {
          const status = getSensiplanStatus({
            cycle: cycleWithEarlyMucus,
            previousCycle: cycleWithFhm
          })
          expect(Object.keys(status.phases).length).to.eql(2)
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
      describe('with shifts detects pre- and peri-ovulatory phase', () => {
        it('according to 5-day-rule', () => {
          const status = getSensiplanStatus({
            cycle: longAndComplicatedCycle,
            previousCycle: cycleWithFhm
          })
          expect(Object.keys(status.phases).length).to.eql(3)
          expect(status.phases.preOvulatory).to.eql({
            cycleDays: longAndComplicatedCycle
              .filter(({date}) => date <= '2018-06-05'),
            start: { date: '2018-06-01' },
            end: { date: '2018-06-05' }
          })
          expect(status.phases.periOvulatory).to.eql({
            cycleDays: longAndComplicatedCycle
              .filter(({date}) => date > '2018-06-05' && date <= '2018-06-21'),
            start: { date: '2018-06-06' },
            end: { date: '2018-06-21', time: '18:00'}
          })
          expect(status.phases.postOvulatory).to.eql({
            cycleDays: longAndComplicatedCycle
              .filter(({date}) => date >= '2018-06-21'),
            start: { date: '2018-06-21', time: '18:00'}
          })
        })
      })
    })
    describe('combining first higher measurment and mucus peak', () => {
      it('with fhM + mucus peak on same day finds start of postovu phase', () => {
        const status = getSensiplanStatus({
          cycle: mucusPeakAndFhmOnSameDay,
          previousCycle: cycleWithFhm
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: mucusPeakAndFhmOnSameDay
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: mucusPeakAndFhmOnSameDay
            .filter(({date}) => {
              return date > '2018-06-05' && date <= '2018-06-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: mucusPeakAndFhmOnSameDay
            .filter(({date}) => date >= '2018-06-21')
        })
      })

      it('with mucus peak 3 days after fhM waits for end of mucus eval', () => {
        const status = getSensiplanStatus({
          cycle: mucusPeakOnLastDayOfTempEval,
          previousCycle: cycleWithFhm
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: mucusPeakOnLastDayOfTempEval
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          end: { date: '2018-06-25', time: '18:00' },
          cycleDays: mucusPeakOnLastDayOfTempEval
            .filter(({date}) => {
              return date > '2018-06-05' && date <= '2018-06-25'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-25',
            time: '18:00'
          },
          cycleDays: mucusPeakOnLastDayOfTempEval
            .filter(({date}) => date >= '2018-06-25')
        })
      })
      it('with mucus peak 4 days after fhM detects no postovu phase', () => {
        const status = getSensiplanStatus({
          cycle: mucusPeakAfterLastDayOfTempEval,
          previousCycle: cycleWithFhm
        })

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: mucusPeakAfterLastDayOfTempEval
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          cycleDays: mucusPeakAfterLastDayOfTempEval
            .filter(({date}) => date > '2018-06-05')
        })
      })
      it('with mucus peak 3 and 4 days after fhM detects no postovu phase', () => {
        const status = getSensiplanStatus({
          cycle: mucusPeakOnAndAfterLastDayOfTempEval,
          previousCycle: cycleWithFhm
        })

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: mucusPeakOnAndAfterLastDayOfTempEval
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          cycleDays: mucusPeakOnAndAfterLastDayOfTempEval
            .filter(({date}) => date > '2018-06-05')
        })
      })
      it('another example for mucus peak before temp shift', () => {
        const status = getSensiplanStatus({
          cycle: mucusPeakSlightlyBeforeTempShift,
          previousCycle: cycleWithFhm
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: mucusPeakSlightlyBeforeTempShift
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          end: { date: '2018-06-17', time: '18:00' },
          cycleDays: mucusPeakSlightlyBeforeTempShift
            .filter(({date}) => {
              return date > '2018-06-05' && date <= '2018-06-17'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-17',
            time: '18:00'
          },
          cycleDays: mucusPeakSlightlyBeforeTempShift
            .filter(({date}) => date >= '2018-06-17')
        })
      })
      it('with another mucus peak 5 days after fHM ignores it', () => {
        const status = getSensiplanStatus({
          cycle: mucusPeak5DaysAfterFhm,
          previousCycle: cycleWithFhm
        })
        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')
        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-01' },
          cycleDays: mucusPeak5DaysAfterFhm
            .filter(({date}) => date <= '2018-06-01')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-02' },
          end: { date: '2018-06-22', time: '18:00' },
          cycleDays: mucusPeak5DaysAfterFhm
            .filter(({date}) => {
              return date > '2018-06-01' && date <= '2018-06-22'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-22',
            time: '18:00'
          },
          cycleDays: mucusPeak5DaysAfterFhm
            .filter(({date}) => date >= '2018-06-22')
        })
      })
      it('with mucus peak 2 days before fhM waits for end of temp eval', () => {
        const status = getSensiplanStatus({
          cycle:  mucusPeakTwoDaysBeforeFhm,
          previousCycle: cycleWithFhm
        })
        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-04' },
          cycleDays: mucusPeakTwoDaysBeforeFhm
            .filter(({date}) => date <= '2018-06-04')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-05' },
          end: { date: '2018-07-03', time: '18:00' },
          cycleDays: mucusPeakTwoDaysBeforeFhm
            .filter(({date}) => {
              return date > '2018-06-04' && date <= '2018-07-03'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-07-03',
            time: '18:00'
          },
          cycleDays: mucusPeakTwoDaysBeforeFhm
            .filter(({date}) => date >= '2018-07-03')
        })
      })
      it('with mucus peak 5 days before fhM waits for end of temp eval', () => {
        const status = getSensiplanStatus({
          cycle:  fhm5DaysAfterMucusPeak,
          previousCycle: cycleWithFhm
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: fhm5DaysAfterMucusPeak
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: fhm5DaysAfterMucusPeak
            .filter(({date}) => {
              return date > '2018-06-05' && date <= '2018-06-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: fhm5DaysAfterMucusPeak
            .filter(({date}) => date >= '2018-06-21')
        })
      })

      it('with mucus only occurring after end of temperature evaluation ignores it', () => {
        const status = getSensiplanStatus({
          cycle:  mucusOnlyAfterEndOfTempEval,
          previousCycle: cycleWithFhm
        })

        expect(status.temperatureShift).to.be.undefined()
        expect(status.mucusShift).to.be.undefined()

        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: fhm5DaysAfterMucusPeak
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          cycleDays: mucusOnlyAfterEndOfTempEval
            .filter(({date}) => {
              return date > '2018-06-05'
            })
        })
      })
    })
    describe('applying the minus-8 rule', () => {
      it('shortens the pre-ovu phase if there is a previous <13 fhm', () => {
        const status = getSensiplanStatus({
          cycle:  longAndComplicatedCycle,
          previousCycle: fhmOnDay15,
          earlierCycles: [fhmOnDay12, ...Array(10).fill(fhmOnDay15)]
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-04' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date <= '2018-06-04')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-05' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => {
              return date > '2018-06-04' && date <= '2018-06-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date >= '2018-06-21')
        })
      })
      it('shortens pre-ovu phase with prev <13 fhm even with <12 cycles', () => {
        const status = getSensiplanStatus({
          cycle:  longAndComplicatedCycle,
          previousCycle: fhmOnDay12,
          earlierCycles: Array(10).fill(fhmOnDay12)
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')

        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-04' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date <= '2018-06-04')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-05' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => {
              return date > '2018-06-04' && date <= '2018-06-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date >= '2018-06-21')
        })
      })
      it('shortens the pre-ovu phase if mucus occurs', () => {
        const status = getSensiplanStatus({
          cycle: cycleWithEarlyMucus,
          previousCycle: fhmOnDay12,
          earlierCycles: Array(10).fill(fhmOnDay12)
        })


        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-01' },
          cycleDays: cycleWithEarlyMucus
            .filter(({date}) => date <= '2018-06-01')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-02' },
          cycleDays: cycleWithEarlyMucus
            .filter(({date}) => {
              return date > '2018-06-01'
            })
        })
      })
      it('shortens the pre-ovu phase if mucus occurs even on the first day', () => {
        const status = getSensiplanStatus({
          cycle: cycleWithMucusOnFirstDay,
          previousCycle: fhmOnDay12,
          earlierCycles: Array(10).fill(fhmOnDay12)
        })


        expect(Object.keys(status.phases).length).to.eql(1)

        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-01' },
          cycleDays: cycleWithMucusOnFirstDay
        })
      })
      it('lengthens the pre-ovu phase if >= 12 cycles with fhm > 13', () => {
        const status = getSensiplanStatus({
          cycle: longAndComplicatedCycle,
          previousCycle: fhmOnDay15,
          earlierCycles: Array(11).fill(fhmOnDay15)
        })


        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-07' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date <= '2018-06-07')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-08' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => {
              return date > '2018-06-07' && date <= '2018-06-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date >= '2018-06-21')
        })
      })
      it('does not lengthen the pre-ovu phase if < 12 cycles', () => {
        const status = getSensiplanStatus({
          cycle: longAndComplicatedCycle,
          previousCycle: fhmOnDay15,
          earlierCycles: Array(10).fill(fhmOnDay15)
        })


        expect(Object.keys(status.phases).length).to.eql(3)
        expect(status.phases.preOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-05' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date <= '2018-06-05')
        })
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-06' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => {
              return date > '2018-06-05' && date <= '2018-06-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date >= '2018-06-21')
        })
      })
      it('does not detect any pre-ovu phase if prev cycle had no fhm', () => {
        const status = getSensiplanStatus({
          cycle: longAndComplicatedCycle,
          previousCycle: cycleWithoutFhm,
          earlierCycles: [...Array(12).fill(fhmOnDay15)]
        })


        expect(Object.keys(status.phases).length).to.eql(2)
        expect(status.phases.periOvulatory).to.eql({
          start: { date: '2018-06-01' },
          end: { date: '2018-06-21', time: '18:00' },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => {
              return date >= '2018-06-01' && date <= '2018-06-21'
            })
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: '2018-06-21',
            time: '18:00'
          },
          cycleDays: longAndComplicatedCycle
            .filter(({date}) => date >= '2018-06-21')
        })
      })
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
          earlierCycles: [[{
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
          earlierCycles: [[{
            date: '1992-09-09',
            bleeding: { value: 0 }
          }]]
        })).to.throw(AssertionError)
        expect(() => getSensiplanStatus({
          cycle: [{
            date: '09-14-2017',
            bleeding: { value: 0 }
          }],
          earlierCycles: [[{
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
          earlierCycles: [[
            {
              date: '2017-09-23',
            }
          ]]
        })).to.throw(AssertionError)
      })
    })
  })
})
