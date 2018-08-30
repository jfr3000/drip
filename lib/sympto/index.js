import getTemperatureShift from './temperature'
import getMucusShift from './mucus'
import getCervixShift from './cervix'
import getPreOvulatoryPhase from './pre-ovulatory'
import { LocalDate } from 'js-joda'
import assert from 'assert'

export default function getSymptoThermalStatus(cycleInfo) {
  const { cycle, previousCycle, earlierCycles = [], secondarySymptom = 'mucus' } = cycleInfo
  throwIfArgsAreNotInRequiredFormat([cycle, ...earlierCycles])

  const status = {
    phases: {}
  }

  // if there was no first higher measurement in the previous cycle,
  // no infertile pre-ovulatory phase may be assumed
  if (previousCycle) {
    const statusForLast = getSymptoThermalStatus({ cycle: previousCycle })
    if (statusForLast.temperatureShift) {
      const preOvuPhase = getPreOvulatoryPhase(
        cycle,
        [previousCycle, ...earlierCycles]
      )
      if (preOvuPhase) {
        status.phases.preOvulatory = preOvuPhase
        if (status.phases.preOvulatory.cycleDays.length === cycle.length) {
          return status
        }
      }
    }
  }

  status.phases.periOvulatory = {
    start: { date: null },
    cycleDays: []
  }
  const periPhase = status.phases.periOvulatory

  if (status.phases.preOvulatory) {
    const prePhase = status.phases.preOvulatory
    const startDate = LocalDate.parse(prePhase.end.date).plusDays(1).toString()
    periPhase.start.date = startDate
    const lastPreDay = prePhase.cycleDays[prePhase.cycleDays.length - 1]
    periPhase.cycleDays = cycle.slice(cycle.indexOf(lastPreDay) + 1)
  } else {
    periPhase.start.date = cycle[0].date
    periPhase.cycleDays = [...cycle]
  }

  const temperatureShift = getTemperatureShift(cycle)

  if (!temperatureShift.detected) return status

  const tempEvalEndIndex = cycle.indexOf(temperatureShift.evaluationCompleteDay)

  let secondaryShift
  if (secondarySymptom === 'mucus') {
    secondaryShift = getMucusShift(cycle, tempEvalEndIndex)
  } else if (secondarySymptom === 'cervix') {
    secondaryShift = getCervixShift(cycle, tempEvalEndIndex)
  }

  if (!secondaryShift.detected) return status

  let periOvulatoryEnd
  const tempOver = temperatureShift.evaluationCompleteDay.date
  const secondarySymptomOver = secondaryShift.evaluationCompleteDay.date

  if (tempOver > secondarySymptomOver) {
    periOvulatoryEnd = temperatureShift.evaluationCompleteDay
  } else {
    periOvulatoryEnd = secondaryShift.evaluationCompleteDay
  }

  const previousPeriDays = periPhase.cycleDays
  const previousPeriEndIndex = previousPeriDays.indexOf(periOvulatoryEnd)

  status.phases.postOvulatory = {
    start: {
      date: periOvulatoryEnd.date,
      time: '18:00'
    },
    cycleDays: previousPeriDays.slice(previousPeriEndIndex)
  }

  periPhase.cycleDays = previousPeriDays.slice(0, previousPeriEndIndex + 1)
  periPhase.end = status.phases.postOvulatory.start

  if (secondarySymptom === 'mucus') {
    status.mucusShift = secondaryShift
  } else if (secondarySymptom === 'cervix') {
    status.cervixShift = secondaryShift
  }

  status.temperatureShift = temperatureShift

  return status
}

function throwIfArgsAreNotInRequiredFormat(cycles) {
  cycles.forEach(cycle => {
    assert.ok(Array.isArray(cycle))
    assert.ok(cycle.length > 0) //what about 2 cycles of 1 day each?!
    assert.ok(cycle[0].bleeding !== null)
    assert.equal(typeof cycle[0].bleeding, 'object', "First cycle day must contain bleeding value")
    assert.equal(typeof cycle[0].bleeding.value, 'number')
    cycle.forEach(day => {
      assert.equal(typeof day.date, 'string')
      assert.doesNotThrow(() => LocalDate.parse(day.date))
      if (day.temperature) assert.equal(typeof day.temperature.value, 'number')
      if (day.mucus) assert.equal(typeof day.mucus.value, 'number')
      if (day.mucus) assert.ok(day.mucus.value >= 0)
      if (day.mucus) assert.ok(day.mucus.value < 5)
      if (day.cervix) assert.equal(typeof day.cervix.isClosed, 'boolean')
      if (day.cervix) assert.equal(typeof day.cervix.isHard, 'boolean')
    })
  })
}
