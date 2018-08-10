import { getCycleStatusForDay } from '../../lib/sympto-adapter'
import { normalizeToScale } from './y-axis'

export default function () {
  let cycleStatus
  let cycleStartDate
  let noMoreCycles = false

  function updateCurrentCycle(dateString) {
    cycleStatus = getCycleStatusForDay(dateString)
    if(!cycleStatus) {
      noMoreCycles = true
      return
    }
    if (cycleStatus.phases.preOvulatory) {
      cycleStartDate = cycleStatus.phases.preOvulatory.start.date
    } else {
      cycleStartDate = cycleStatus.phases.periOvulatory.start.date
    }
  }

  function dateIsInPeriOrPostPhase(dateString) {
    return (
      dateString >= cycleStatus.phases.periOvulatory.start.date
    )
  }

  function precededByAnotherTempValue(dateString) {
    return (
      // we are only interested in days that have a preceding
      // temp
      Object.keys(cycleStatus.phases).some(phaseName => {
        return cycleStatus.phases[phaseName].cycleDays.some(day => {
          return day.temperature && day.date < dateString
        })
      })
      // and also a following temp, so we don't draw the line
      // longer than necessary
      &&
      cycleStatus.phases.postOvulatory.cycleDays.some(day => {
        return day.temperature && day.date > dateString
      })
    )
  }

  function isInTempMeasuringPhase(cycleDay, dateString) {
    return (
      cycleDay && cycleDay.temperature
      || precededByAnotherTempValue(dateString)
    )
  }

  return function(dateString, cycleDay) {
    const ret = {}
    if (!cycleStatus && !noMoreCycles) updateCurrentCycle(dateString)
    if (noMoreCycles) return ret

    if (dateString < cycleStartDate) updateCurrentCycle(dateString)
    if (noMoreCycles) return ret

    const tempShift = cycleStatus.temperatureShift

    if (tempShift) {
      if (tempShift.firstHighMeasurementDay.date === dateString) {
        ret.drawFhmLine = true
      }

      if (
        dateIsInPeriOrPostPhase(dateString) &&
        isInTempMeasuringPhase(cycleDay, dateString)
      ) {
        ret.drawLtlAt = normalizeToScale(tempShift.ltl)
      }
    }

    return ret
  }
}