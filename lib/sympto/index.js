import getTemperatureShift from './temperature'
import getMucusShift from './mucus'
import getPreOvulatoryPhase from './pre-ovulatory'
import { LocalDate } from 'js-joda'

export default function ({ cycle, previousCycle }) {
  throwIfArgsAreNotInRequiredFormat(cycle, previousCycle)

  const status = {
    assumeFertility: true,
    phases: {}
  }

  // if there was no first higher measurement in the previous cycle,
  // no infertile pre-ovulatory phase may be assumed
  if (getTemperatureShift(previousCycle).detected && !cycle[0].mucus) {
    status.phases.preOvulatory = getPreOvulatoryPhase(cycle)
    if (status.phases.preOvulatory.cycleDays.length === cycle.length) {
      status.assumeFertility = false
      return status
    }
  }

  status.phases.periOvulatory = {
    start: { date: null },
    cycleDays: []
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

  const prevPeriOvulatoryDays = periPhase.cycleDays
  const periOvulatoryEndIndex = prevPeriOvulatoryDays.indexOf(periOvulatoryEnd)

  status.phases.postOvulatory = {
    start: {
      date: periOvulatoryEnd.date,
      time: '18:00'
    },
    cycleDays: prevPeriOvulatoryDays.slice(periOvulatoryEndIndex)
  }

  periPhase.cycleDays = prevPeriOvulatoryDays.slice(0, periOvulatoryEndIndex + 1)
  periPhase.end = status.phases.postOvulatory.start

  status.mucusShift = mucusShift
  status.temperatureShift = temperatureShift
  status.assumeFertility = false

  return status
}

function throwIfArgsAreNotInRequiredFormat(cycle, previousCycle) {
  if (!Array.isArray(cycle) || !cycle.length) throw new Error('Please provide all cycle days as array')
  if (!Array.isArray(previousCycle) || !previousCycle.length) throw new Error('Please provide previous cycle days as array')
  if (
    !cycle[0].bleeding || typeof cycle[0].bleeding.value != 'number' ||
    !previousCycle[0].bleeding || typeof previousCycle[0].bleeding.value != 'number'
  ) throw new Error('Cycle must start with bleeding')

  if ([cycle, previousCycle].some(cycle => {
    return cycle.some(day => {
      if (!day.date) return true
      try {
        LocalDate.parse(day.date)
      } catch(err) {
        throw new Error('Please provide dates in ISO8601 format')
      }
      if (day.temperature && typeof day.temperature.value != 'number') return true
      if (day.mucus && typeof day.mucus.value != 'number') return true
    })
  })) throw new Error('Cycle days are not in correct format')
}