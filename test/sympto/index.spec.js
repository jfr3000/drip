import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'

const expect = chai.expect

function convertToSymptoFormat(val, i) {
  const sympto = { date: i }
  if (val.temperature) sympto.temperature = { value: val.temperature }
  if (val.mucus) sympto.mucus = { value: val.mucus }
  if (val.bleeding) sympto.bleeding = { value: val.bleeding }
  return sympto
}

const cycleWithTempShift = [36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.8, 36.8, 36.8]
  .map(num => ({ temperature: num }))
  .map(convertToSymptoFormat)

const cycleWithoutTempShift = [36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.8, 36.8]
  .map(num => ({ temperature: num }))
  .map(convertToSymptoFormat)

const cycleWithTempAndMucusShift = [
  { temperature: 36.6, bleeding: 2 },
  { temperature: 36.65 },
  { temperature: 36.5 },
  { temperature: 36.6 },
  { temperature: 36.55 },
  { temperature: 36.7, mucus: 0 },
  { temperature: 36.75, mucus: 0 },
  { temperature: 36.45, mucus: 1 },
  { temperature: 36.5, mucus: 4 },
  { temperature: 36.4, mucus: 2 },
  { temperature: 36.5, mucus: 3 },
  { temperature: 36.55, mucus: 3 },
  { temperature: 36.45, mucus: 3 },
  { temperature: 36.5, mucus: 4 },
  { temperature: 36.55, mucus: 4 },
  { temperature: 36.7, mucus: 3 },
  { temperature: 36.65, mucus: 3 },
  { temperature: 36.75, mucus: 4 },
  { temperature: 36.8, mucus: 1 },
  { temperature: 36.85, mucus: 2 },
  { temperature: 36.8, mucus: 2 },
  { temperature: 36.9, mucus: 2 },
  { temperature: 36.9, mucus: 1 },
  { temperature: 36.85, mucus: 1 },
  { temperature: 36.9, mucus: 1 },
  { temperature: 36.8, mucus: 1 },
  { temperature: 36.9, mucus: 1 }
].map(convertToSymptoFormat)

describe('sympto', () => {
  describe('evaluating mucus and temperature shift together', () => {
    describe('with no previous higher measurement', () => {
      it('with no shifts detects only periovulatory', function () {
        const values = [
          { temperature: 36.6, bleeding: 2 },
          { temperature: 36.65 },
          { temperature: 36.5 },
          { temperature: 36.6 },
          { temperature: 36.55 },
          { temperature: 36.7, mucus: 0 },
          { temperature: 36.75, mucus: 0 },
          { temperature: 36.45, mucus: 1 }
        ]

        const cycle = values.map(convertToSymptoFormat)
        const status = getSensiplanStatus({
          cycle,
          previousCycle: cycleWithoutTempShift
        })

        expect(status).to.eql({
          assumeFertility: true,
          phases: {
            periOvulatory: {
              start: {
                date: 0,
                time: '00:00'
              },
              cycleDays: cycle
            }
          },
        })
      })

      it('with shifts detects only periovulatory and postovulatory', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithTempAndMucusShift,
          previousCycle: cycleWithoutTempShift
        })

        expect(status.temperatureShift).to.be.an('object')
        expect(status.mucusShift).to.be.an('object')
        expect(status.assumeFertility).to.be.true()
        expect(Object.keys(status.phases)).to.eql(['periOvulatory', 'postOvulatory'])
        expect(status.phases.periOvulatory).to.eql({
          start: {
            date: 0,
            time: '00:00'
          },
          cycleDays: cycleWithTempAndMucusShift.slice(0, 21)
        })
        expect(status.phases.postOvulatory).to.eql({
          start: {
            date: 20,
            time: '18:00'
          },
          cycleDays: cycleWithTempAndMucusShift.slice(20)
        })
      })
    })
  })
  describe('with shifts', () => {
    it.skip('reports fertile when mucus reaches best quality again within temperature evaluation phase', function () {
      const status = getSensiplanStatus(temperatures)
      expect(status).to.eql({
        assumeFertility: false,
        phases: {
          preOvulatory:
            { startDate: 0, startTime: '00:00' },
          periOvulatory: 'TODO',
          postOvulatory: { startDate: 17, startTime: '18:00' }
        },
        temperatureShift: {
          detected: true,
          ltl: 36.55,
          rule: 0,
          firstHighMeasurementDay: {
            date: 15,
            temperature: { value: 36.7 },
            mucus: { value: 3 }
          },
          evaluationCompleteDay: {
            date: 17,
            temperature: { value: 36.75 },
            mucus: { value: 4 },
          }
        },
        mucusShift: {
          detected: true,
          mucusPeak: {
            date: 17,
            mucus: { value: 4 },
            temperature: { value: 36.75 },
          }
        }
      })
    })

  })
})