import getTemperatureShift from './temperature'
import getMucusShift from './mucus'
import getPreOvulatoryPhase from './pre-ovulatory'
import { LocalDate } from 'js-joda'

export default function ({ cycle, previousCycle }) {
  // TODO check for basic stuff, throw if nonexistent
  const status = {
    assumeFertility: true,
    phases: {
      periOvulatory: {
        start: {
          date: null
        },
        cycleDays: null
      }
    }
  }

  // if there was no first higher measurement in the previous cycle,
  // no infertile preovulatory phase may be assumed
  if (getTemperatureShift(previousCycle).detected && !cycle[0].mucus) {
    status.phases.preOvulatory = getPreOvulatoryPhase(cycle)
  }

  const periPhase = status.phases.periOvulatory
  if (status.phases.preOvulatory) {
    const prePhase = status.phases.preOvulatory
    periPhase.start.date = LocalDate.parse(prePhase.end.date).plusDays(1).toString()
    const lastPreDay = prePhase.cycleDays[prePhase.cycleDays.length - 1]
    periPhase.cycleDays = cycle.slice(cycle.indexOf(lastPreDay) + 1)
  } else {
    periPhase.start.date = cycle[0].date
    periPhase.cycleDays = [...cycle]
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