import getTemperatureShift from './temperature'
import getMucusShift from './mucus'

export default function (cycleDays) {
  const assumeFertileStatus = { assumeFertility: true }
  // TODO second phase calculation
  if (cycleDays.length) assumeFertileStatus.phases = [
    {
      startDate: cycleDays[0].date,
      startTime: '00:00'
    },
    'TODO'
  ]

  const temperatureShift = getTemperatureShift(cycleDays)
  if (!temperatureShift.detected) return assumeFertileStatus

  const tempEvalEndIndex = cycleDays.indexOf(temperatureShift.evaluationCompleteDay)
  const mucusShift = getMucusShift(cycleDays, tempEvalEndIndex)
  if (!mucusShift.detected) return assumeFertileStatus

  const phase2 = {
    startDate: temperatureShift.evaluationCompleteDay.date,
    startTime: '18:00'
  }

  return {
    assumeFertility: false,
    temperatureShift,
    mucusShift,
    phases: assumeFertileStatus.phases.concat(phase2)
  }
}