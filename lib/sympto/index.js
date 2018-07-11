import getTemperatureShift from './temperature'
import getMucusShift from './mucus'
import getPreOvulatoryPhase from './pre-ovulatory'
import { LocalDate } from 'js-joda'
import assert from 'assert'

export default function ({ cycle, previousCycles = [] }) {
  throwIfArgsAreNotInRequiredFormat(cycle, previousCycles)

  const status = {
    assumeFertility: true,
    phases: {}
  }
  // TODO handle no previous cycles

  // if there was no first higher measurement in the previous cycle,
  // no infertile pre-ovulatory phase may be assumed
  const lastCycle = previousCycles[previousCycles.length - 1]
  if (getTemperatureShift(lastCycle).detected && !cycle[0].mucus) {
    status.phases.preOvulatory = getPreOvulatoryPhase(cycle, previousCycles)
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

function throwIfArgsAreNotInRequiredFormat(cycle, previousCycles) {
  [cycle, ...previousCycles].forEach(cycle => {
    assert.ok(Array.isArray(cycle))
    // TODO handle case of no previous cycles
    assert.ok(cycle.length > 0)
    assert.equal(typeof cycle[0].bleeding, 'object')
    assert.equal(typeof cycle[0].bleeding.value, 'number')
    cycle.forEach(day => {
      assert.equal(typeof day.date, 'string')
      assert.doesNotThrow(() => LocalDate.parse(day.date))
      if (day.temperature) assert.equal(typeof day.temperature.value, 'number')
      if (day.mucus) assert.equal(typeof day.mucus.value, 'number')
      if (day.mucus) assert.ok(day.mucus.value >= 0)
      if (day.mucus) assert.ok(day.mucus.value < 5)
    })
  })
}