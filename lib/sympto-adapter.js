import getFertilityStatus from './sympto'
import cycleModule from './cycle'

const { getCycleDaysBeforeDay } = cycleModule()

export default function (dateString) {
  // we get earliest last, but sympto wants earliest first
  const cycle = getCycleDaysBeforeDay(dateString).reverse()
  // const previousCycles = getPreviousCycles()
  const status = getFertilityStatus({cycle})

  return formatStatusForApp(status)
}

function formatStatusForApp(status) {
  const fertileStatus = status.assumeFertility ? 'fertile' : 'infertile'
  return `You are currently ${fertileStatus}`
}