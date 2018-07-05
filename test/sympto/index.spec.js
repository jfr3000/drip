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

describe('sympto', () => {
  describe('evaluating mucus and temperature shift together', () => {
    it('reports fertile when mucus reaches best quality again within temperature evaluation phase', function () {
      const values = [
        { temperature: 36.6 , bleeding: 2 },
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
      ]

      const temperatures = values.map(convertToSymptoFormat)
      const status = getSensiplanStatus(temperatures)
      expect(status).to.eql({
        assumeFertility: false,
        phases: [
          { startDate: 0, startTime: '00:00'},
          'TODO',
          { startDate: 17, startTime: '18:00'}
        ],
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