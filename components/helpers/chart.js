import { scaleObservable, unitObservable } from '../../local-storage'
import config from '../../config'

export function normalizeToScale(temp, columnHeight) {
  const scale = scaleObservable.value
  const valueRelativeToScale = (scale.max - temp) / (scale.max - scale.min)
  return getAbsoluteValue(valueRelativeToScale, columnHeight)
}

function getAbsoluteValue(relative, columnHeight) {
  // we add some height to have some breathing room
  const verticalPadding = columnHeight * config.temperatureScale.verticalPadding
  const scaleHeight = columnHeight - 2 * verticalPadding
  return scaleHeight * relative + verticalPadding
}

export function getTickPositions(columnHeight) {
  const units = unitObservable.value
  const scaleMin = scaleObservable.value.min
  const scaleMax = scaleObservable.value.max
  const numberOfTicks = (scaleMax - scaleMin) * (1 / units) + 1
  const tickDistance = 1 / (numberOfTicks - 1)
  const tickPositions = []
  for (let i = 0; i < numberOfTicks; i++) {
    const position = getAbsoluteValue(tickDistance * i, columnHeight)
    tickPositions.push(position)
  }
  return tickPositions
}

export function getTickList(columnHeight) {

  const units = unitObservable.value
  const scaleMax = scaleObservable.value.max

  return getTickPositions(columnHeight).map((tickPosition, i) => {

    const tick = scaleMax - i * units
    let isBold, label, shouldShowLabel

    if (Number.isInteger(tick)) {
      isBold = true
      label = tick.toString() + '.0'
    } else {
      isBold = false
      label = tick.toString()
    }

    // when temp range <= 3, units === 0.1 we show temp values with step 0.2
    // when temp range > 3, units === 0.5 we show temp values with step 0.5

    if (units === 0.1) {
      // show label with step 0.2
      shouldShowLabel = !(tick * 10 % 2)
    } else {
      // show label with step 0.5
      shouldShowLabel = !(tick * 10 % 5)
    }

    return {
      position: tickPosition,
      label,
      isBold,
      shouldShowLabel,
    }
  })
}
