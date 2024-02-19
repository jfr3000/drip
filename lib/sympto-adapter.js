import getFertilityStatus from 'sympto'
import cycleModule from './cycle'
import { useCervixAsSecondarySymptomObservable } from '../local-storage'
import { fertilityStatus as labels } from '../i18n/en/labels'

export function getFertilityStatusForDay(dateString) {
  const status = getCycleStatusForDay(dateString)
  if (!status) return {
    status: labels.fertile,
    phase: null,
    statusText: labels.unknown
  }

  const phases = Object.keys(status.phases)
  const phaseNameForDay = phases.find(phaseName => {
    const phase = status.phases[phaseName]
    const dayIsAfterPhaseStart = dateString >= phase.start.date
    let dayIsBeforePhaseEnd
    if (phase.end) {
      dayIsBeforePhaseEnd = dateString <= phase.end.date
    } else {
      dayIsBeforePhaseEnd = true
    }
    return dayIsAfterPhaseStart && dayIsBeforePhaseEnd
  })

  // if there's only cycle data for the pre phase and the target day is after its end,
  // the day is in the peri phase
  if (phases.length === 1 && phases[0] === 'preOvulatory' && !phaseNameForDay) {
    return formatStatus('periOvulatory', dateString, {phases: {periOvulatory: {}}})
  }

  return formatStatus(phaseNameForDay, dateString, status)
}

export function getCycleStatusForDay(dateString, opts = {}) {
  const {
    getCycleForDay,
    getCyclesBefore,
    getPreviousCycle
  } = cycleModule()

  const cycle = getCycleForDay(dateString)
  if (!cycle) return null

  const cycleInfo = {cycle: formatCycleForSympto(cycle)}

  const previousCycle = getPreviousCycle(dateString)

  if (previousCycle) {
    cycleInfo.previousCycle = formatCycleForSympto(previousCycle)
  }
  if (previousCycle && !opts.excludeEarlierCycles) {
    const earlierCycles = getCyclesBefore(previousCycle[0])
    if (earlierCycles) {
      cycleInfo.earlierCycles = earlierCycles.map(formatCycleForSympto)
    }
  }

  cycleInfo.secondarySymptom = useCervixAsSecondarySymptomObservable.value ? 'cervix' : 'mucus'

  return getFertilityStatus(cycleInfo)
}

function formatStatus(phaseNameForDay, dateString, status) {
  const mapping = {
    preOvulatory: () => {
      return {
        status: labels.infertile,
        phase: 1,
        statusText: labels.preOvuText
      }
    },
    periOvulatory: (dateString, status) => {
      //there might not actually be any data for the phase
      const peri = status.phases.periOvulatory
      const phaseEnd = peri && peri.end
      let periStatus
      let periStatusText
      if (phaseEnd && phaseEnd.date === dateString) {
        periStatus = labels.fertileUntilEvening
        periStatusText = labels.periOvuUntilEveningText(status.temperatureShift.rule)
      } else {
        periStatus = labels.fertile
        periStatusText = labels.periOvuText
      }
      return {
        status: periStatus,
        phase: 2,
        statusText: periStatusText
      }
    },
    postOvulatory: (dateString, status) => {
      return {
        status: labels.infertile,
        phase: 3,
        statusText: labels.postOvuText(status.temperatureShift.rule)
      }
    }
  }

  return mapping[phaseNameForDay](dateString, status)
}

function formatCycleForSympto(cycle) {
  const formatted = cycle.reduce((acc, oldDay) => {
    // deep clone
    const day = JSON.parse(JSON.stringify(oldDay));
    // remove excluded symptoms
    ['bleeding', 'temperature', 'mucus', 'cervix'].forEach(symptomName => {
      if (day[symptomName] && day[symptomName].exclude) {
        delete day[symptomName]
      }
    })
    // remove days with incomplete cervix values
    if (hasIncompleteCervixValue(day)) {
      delete day.cervix
    }
    // remove days with incomplete mucus value (because nfp-mucus returns null when that's the case)
    if (day.mucus && day.mucus.value === null) {
      delete day.mucus
    }
    // change format
    ['bleeding', 'temperature', 'mucus'].forEach(symptomName => {
      if (day[symptomName]) day[symptomName] = day[symptomName].value
    })
    acc.push(day)
    return acc
  }, [])
  // we get earliest last, but sympto wants earliest first
  formatted.reverse()
  return formatted
}

function hasIncompleteCervixValue(day) {
  return day.cervix && (typeof day.cervix.opening != 'number' || typeof day.cervix.firmness != 'number')
}