import getFertilityStatus from './sympto'
import cycleModule from './cycle'
import { fertilityStatus } from '../components/labels'

export function getFertilityStatusForDay(dateString) {
  const status = getCycleStatusForDay(dateString)
  if (!status) return {
    status: fertilityStatus.fertile,
    phase: null
  }

  const phaseNameForDay = Object.keys(status.phases).find(phaseName => {
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

  return getFertilityStatus(cycleInfo)
}

function formatStatus(phaseNameForDay, dateString, status) {
  const mapping = {
    preOvulatory: () => {
      return {
        status: fertilityStatus.infertile,
        phase: 1,
        statusText: fertilityStatus.preOvuText
      }
    },
    periOvulatory: (dateString, status) => {
      const phaseEnd = status.phases.periOvulatory.end
      if (phaseEnd && phaseEnd.date === dateString) {
        return fertilityStatus.fertileUntilEvening
      }
      return {
        status: fertilityStatus.fertile,
        phase: 2,
        statusText: fertilityStatus.periOvuText
      }
    },
    postOvulatory: (dateString, status) => {
      return {
        status: fertilityStatus.infertile,
        phase: 3,
        statusText: fertilityStatus.postOvuText(status.temperatureShift.rule)
      }
    }
  }

  return mapping[phaseNameForDay](dateString, status)
}

function formatCycleForSympto(cycle) {
  // we get earliest last, but sympto wants earliest first
  cycle.reverse()
  return cycle
}