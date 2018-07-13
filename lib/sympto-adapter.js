import getFertilityStatus from './sympto'
import cycleModule from './cycle'
import { fertilityStatus } from '../labels/labels'

const { getCycleDaysBeforeDay, getPreviousCycles } = cycleModule()

export default function (dateString) {
  const cycle = getCycleDaysBeforeDay(dateString)
  if (!cycle) return fertilityStatus.unknown

  // we get earliest last, but sympto wants earliest first
  cycle.reverse()
  const previousCycles = getPreviousCycles(cycle[0])
  previousCycles.forEach(cycle => cycle.reverse())

  const status = getFertilityStatus({cycle, previousCycles})

  return formatStatusForApp(status)
}

function formatStatusForApp(status) {
  if (status.assumeFertility) {
    return fertilityStatus.fertile
  } else {
    return fertilityStatus.infertile
  }
}