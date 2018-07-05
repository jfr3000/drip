import getTemperatureShift from './temperature'
import getMucusShift from './mucus'

export default function (cycleDays) {
  const assumeFertile = { assumeFertility: true }

  const temperatureShift = getTemperatureShift(cycleDays)
  if (!temperatureShift.detected) return assumeFertile

  const tempEvalEndIndex = cycleDays.indexOf(temperatureShift.evaluationCompleteDay)
  const mucusShift = getMucusShift(cycleDays, tempEvalEndIndex)
  if (!mucusShift.detected) return assumeFertile

  return {
    assumeFertility: false,
    temperatureShift,
    mucusShift
  }
}