import getTemperatureStatus from './temperature'
import getMucusStatus from './mucus'

export default function (cycleDays) {
  const temperatureStatus = getTemperatureStatus(cycleDays)
  const mucusStatus = getMucusStatus(cycleDays)
  return {
    assumeFertility: true,
    temperatureStatus,
    mucusStatus
  }
}