import React from 'react'
import { Text, View } from 'react-native'
import config from '../../config'
import styles from './styles'
import { scaleObservable } from '../../local-storage'

export function makeYAxisLabels(columnHeight) {
  const units = config.temperatureScale.units
  const scaleMax = scaleObservable.value.max
  const scaleMin = scaleObservable.value.min
  const style = styles.yAxisLabel

  return getTickPositions(columnHeight).map((y, i) => {
    // this eyeballing is sadly necessary because RN does not
    // support percentage values for transforms, which we'd need
    // to reliably place the label vertically centered to the grid
    let tickLabelDistance
    let tickUnit
    if (scaleMax - scaleMin <= 3) {
      tickLabelDistance = 2
      tickUnit = 1
    } else if (scaleMax - scaleMin <= 5) {
      tickLabelDistance = 2
      tickUnit = 2
    } else {
      tickLabelDistance = 5
      tickUnit = 5
    }
    if (scaleMax - i * tickUnit * units === 37) console.log(y)
    const tick = scaleMax - i * tickUnit * units
    const tickLabel = tick * 10 % 10 ? tick.toString() : tick.toString() + '.0'
    const showTick =  tick * 10 % tickLabelDistance ? false : true
    const tickBold = tick * 10 % 5 ? {} : {fontWeight: 'bold'}
    return (
      <Text
        style={[style, {top: y - 8}, tickBold]}
        key={i}>
        {showTick && tickLabel}
      </Text>
    )
  })
}

export function makeHorizontalGrid(columnHeight, symptomRowHeight) {
  return getTickPositions(columnHeight).map(tick => {
    return (
      <View
        top={tick + symptomRowHeight}
        {...styles.horizontalGrid}
        key={tick}
      />
    )
  })
}

function getTickPositions(columnHeight) {
  const units = config.temperatureScale.units
  const scaleMin = scaleObservable.value.min
  const scaleMax = scaleObservable.value.max
  const numberOfTicks = (scaleMax - scaleMin) * (1 / units) + 1
  let tickDistance
  if (numberOfTicks <= 31) {
    tickDistance = 1 / (numberOfTicks - 1)
  } else if (numberOfTicks <= 51) {
    tickDistance = 2 / (numberOfTicks - 1)
  } else {
    tickDistance = 5 / (numberOfTicks - 1)
  }

  const tickPositions = []
  for (let i = 0; i < numberOfTicks; i++) {
    const position = getAbsoluteValue(tickDistance * i, columnHeight)
    tickPositions.push(position)
  }
  return tickPositions
}

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