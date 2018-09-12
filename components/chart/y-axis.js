import React from 'react'
import { Text, View } from 'react-native'
import config from '../../config'
import styles from './styles'
import { scaleObservable, unitObservable } from '../../local-storage'

export function makeYAxisLabels(columnHeight) {
  const units = unitObservable.value
  const scaleMax = scaleObservable.value.max
  const style = styles.yAxisLabel

  return getTickPositions(columnHeight).map((y, i) => {
    // this eyeballing is sadly necessary because RN does not
    // support percentage values for transforms, which we'd need
    // to reliably place the label vertically centered to the grid
    const tick = scaleMax - i * units
    const tickLabel = tick * 10 % 10 ? tick.toString() : tick.toString() + '.0'
    let showTick
    let tickBold
    if (units === 0.1) {
      showTick =  (tick * 10 % 2) ? false : true
      tickBold = tick * 10 % 5 ? {} : {fontWeight: 'bold'}
    } else {
      showTick =  (tick * 10 % 5) ? false : true
      tickBold = tick * 10 % 10 ? {} : {fontWeight: 'bold'}
    }
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