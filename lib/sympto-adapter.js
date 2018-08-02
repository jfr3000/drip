import getFertilityStatus from './sympto'
import cycleModule from './cycle'
import { fertilityStatus } from '../components/cycle-day/labels/labels'

const {
  getCycleForDay,
  getCyclesBefore,
  getPreviousCycle
} = cycleModule()

export function getFertilityStatusStringForDay(dateString) {
  const status = getCycleStatusForDay(dateString)
  if (!status) return fertilityStatus.unknown

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

  return mapToString(phaseNameForDay, dateString, status)
}

export function getCycleStatusForDay(dateString) {
  const cycle = getCycleForDay(dateString)
  if (!cycle) return null

  const cycleInfo = {cycle: formatCycleForSympto(cycle)}

  const previousCycle = getPreviousCycle(dateString)

  if (previousCycle) {
    cycleInfo.previousCycle = formatCycleForSympto(previousCycle)
    const earlierCycles = getCyclesBefore(previousCycle[0])
    if (earlierCycles) {
      cycleInfo.earlierCycles = earlierCycles.map(formatCycleForSympto)
    }
  }

  return getFertilityStatus(cycleInfo)
}

function mapToString(phaseNameForDay, dateString, status) {
  const mapping = {
    preOvulatory: () => fertilityStatus.infertile,
    periOvulatory: (dateString, status) => {
      const phaseEnd = status.phases.periOvulatory.end
      if (phaseEnd && phaseEnd.date === dateString) {
        return fertilityStatus.fertileUntilEvening
      }
      return fertilityStatus.fertile
    },
    postOvulatory: () => fertilityStatus.infertile
  }

  return mapping[phaseNameForDay](dateString, status)
}

function formatCycleForSympto(cycle) {
  // we get earliest last, but sympto wants earliest first
  cycle.reverse()
  return cycle
}