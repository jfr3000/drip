import { getCycleStatusForDay } from '../../lib/sympto-adapter'
import { normalizeToScale } from './y-axis'

export default function () {
  const cycle = {
    status: null
  }

  function updateCurrentCycle(dateString) {
    cycle.status = getCycleStatusForDay(dateString)
    if(!cycle.status) {
      cycle.noMoreCycles = true
      return
    }
    if (cycle.status.phases.preOvulatory) {
      cycle.startDate = cycle.status.phases.preOvulatory.start.date
    } else {
      cycle.startDate = cycle.status.phases.periOvulatory.start.date
    }
  }

  function dateIsInPeriOrPostPhase(dateString) {
    return (
      dateString >= cycle.status.phases.periOvulatory.start.date
    )
  }

  function precededByAnotherTempValue(dateString) {
    return (
      // we are only interested in days that have a preceding
      // temp
      Object.keys(cycle.status.phases).some(phaseName => {
        return cycle.status.phases[phaseName].cycleDays.some(day => {
          return day.temperature && day.date < dateString
        })
      })
      // and also a following temp, so we don't draw the line
      // longer than necessary
      &&
      cycle.status.phases.postOvulatory.cycleDays.some(day => {
        return day.temperature && day.date > dateString
      })
    )
  }

  function isInTempMeasuringPhase(temperature, dateString) {
    return (
      temperature || precededByAnotherTempValue(dateString)
    )
  }

  return function(dateString, temperature, columnHeight) {
    const ret = {
      drawLtlAt: null,
      drawFhmLine: false
    }
    if (!cycle.status && !cycle.noMoreCycles) updateCurrentCycle(dateString)
    if (cycle.noMoreCycles) return ret

    if (dateString < cycle.startDate) updateCurrentCycle(dateString)
    if (cycle.noMoreCycles) return ret

    const tempShift = cycle.status.temperatureShift

    if (tempShift) {
      if (tempShift.firstHighMeasurementDay.date === dateString) {
        ret.drawFhmLine = true
      }

      if (
        dateIsInPeriOrPostPhase(dateString) &&
        isInTempMeasuringPhase(temperature, dateString)
      ) {
        ret.drawLtlAt = normalizeToScale(tempShift.ltl, columnHeight)
      }
    }

    return ret
  }
}