import getTemperatureStatus from './sympto/temperature'
import cycleModule from './cycle'

const getLastMensesStart = cycleModule().getLastMensesStart
const getPreviousTemperaturesInCycle = cycleModule().getPreviousTemperaturesInCycle

function getTemperatureFertilityStatus(targetDateString) {
  const lastMensesStart = getLastMensesStart(targetDateString)
  if (!lastMensesStart) return formatStatusForApp({ detected: false })
  const previousTemperaturesInCycle = getPreviousTemperaturesInCycle(targetDateString, lastMensesStart)
  // we get temps with latest first, but sympto module expects latest last
  previousTemperaturesInCycle.reverse()
  const status = getTemperatureStatus(previousTemperaturesInCycle)
  return formatStatusForApp(status)
}

function formatStatusForApp(status) {
  if (!status.detected) return 'fertile'
  const dict = [
    "regular temperature",
    "first exception",
    "second exception"
  ]
  return `infertile according to the ${dict[status.rule]} rule`
}

export {
  getTemperatureFertilityStatus
}