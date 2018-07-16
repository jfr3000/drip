import getFertilityStatus from './sympto'
import cycleModule from './cycle'
import { fertilityStatus } from '../labels/labels'

const { getCycleDaysBeforeDay, getPreviousCycles } = cycleModule()

export default function (dateString) {
  const cycle = getCycleDaysBeforeDay(dateString)
  if (!cycle) return fertilityStatus.unknown

  const previousCycles = getPreviousCycles(cycle[0])

  const status = getFertilityStatus({
    cycle: formatCycleForSympto(cycle),
    previousCycles: previousCycles.map(formatCycleForSympto)
  })

  return formatStatusForApp(status)
}

function formatStatusForApp(status) {
  if (status.assumeFertility) {
    return fertilityStatus.fertile
  } else {
    return fertilityStatus.infertile
  }
}

function formatCycleForSympto(cycle) {
  // we get earliest last, but sympto wants earliest first
  cycle.reverse()
  return cycle
}