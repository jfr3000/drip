import getFertilityStatus from './sympto'
import cycleModule from './cycle'

const { getCycleDaysBeforeDay, getPreviousCycles } = cycleModule()

export default function (dateString) {
  const cycle = getCycleDaysBeforeDay(dateString)
  if (!cycle) return `We cannot show any cycle information because no menses has been entered`

  // we get earliest last, but sympto wants earliest first
  cycle.reverse()
  const previousCycles = getPreviousCycles(cycle[0])
  previousCycles.forEach(cycle => cycle.reverse())

  const status = getFertilityStatus({cycle, previousCycles})

  return formatStatusForApp(status)
}

function formatStatusForApp(status) {
  return status.assumeFertility ? 'fertile' : 'infertile'
}