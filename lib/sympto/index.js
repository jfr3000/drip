import getTemperatureShift from './temperature'
import getMucusShift from './mucus'

export default function ({ cycle, previousCycle }) {
  // TODO check for basic stuff, throw if nonexistent
  const status = {
    assumeFertility: true,
    phases: {
      periOvulatory: {
        start: {
          date: null,
          time: '00:00'
        },
        cycleDays: null
      }
    }
  }

  // if there was no first higher measurement in the previous cycle,
  // no infertile preovulatory phase may be assumed

  if (getTemperatureShift(previousCycle).detected) {
    // add preOvulatory phase
  } else {
    const first = cycle[0]
    status.phases.periOvulatory.start.date = first.date
    status.phases.periOvulatory.cycleDays = [...cycle]
  }

  const temperatureShift = getTemperatureShift(cycle)
  if (!temperatureShift.detected) return status

  const tempEvalEndIndex = cycle.indexOf(temperatureShift.evaluationCompleteDay)
  const mucusShift = getMucusShift(cycle, tempEvalEndIndex)
  if (!mucusShift.detected) return status

  const periOvulatoryEnd =
    temperatureShift.evaluationCompleteDay.date > mucusShift.evaluationCompleteDay.date ?
      temperatureShift.evaluationCompleteDay : mucusShift.evaluationCompleteDay

  const prevPeriOvulatoryDays = status.phases.periOvulatory.cycleDays
  const periOvulatoryEndIndex = prevPeriOvulatoryDays.indexOf(periOvulatoryEnd)

  status.phases.postOvulatory = {
    start: {
      date: periOvulatoryEnd.date,
      time: '18:00'
    },
    cycleDays: prevPeriOvulatoryDays.slice(periOvulatoryEndIndex)
  }

  status.phases.periOvulatory.cycleDays = prevPeriOvulatoryDays.slice(0, periOvulatoryEndIndex + 1)

  status.mucusShift = mucusShift
  status.temperatureShift = temperatureShift

  return status
}