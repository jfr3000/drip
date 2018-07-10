import chai from 'chai'
import getSensiplanStatus from '../../lib/sympto'

const expect = chai.expect

function convertToSymptoFormat(val, i) {
  ++i
  const dayString = i < 10 ? `0${i}` : i
  const sympto = { date: `2018-06-${dayString}` }
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

const cycleWithTempAndNoMucusShift = [
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
  { temperature: 36.8, mucus: 4 },
  { temperature: 36.85, mucus: 4 },
  { temperature: 36.8, mucus: 4 },
  { temperature: 36.9, mucus: 4 }
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
              start: { date: '2018-06-01' },
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
          start: { date: '2018-06-01' },
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
    describe('with no shifts detects pre- and periovulatory phase', function () {
      it('according to 5-day-rule', function () {
        const status = getSensiplanStatus({
          cycle: cycleWithTempAndNoMucusShift,
          previousCycle: cycleWithTempShift
        })

        expect(Object.keys(status.phases)).to.eql(['periOvulatory', 'preOvulatory'])
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
  })
})