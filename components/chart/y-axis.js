import React from 'react'
import { Text, View } from 'react-native'
import config from '../../config'
import styles from './styles'
import { tempScaleObservable } from '../../local-storage'

export function makeYAxisLabels() {
  const units = config.temperatureScale.units
  const scaleMax = tempScaleObservable.value.max

  return getTickPositions().map((y, i) => {
    const style = styles.yAxisLabel
    // this eyeballing is sadly necessary because RN does not
    // support percentage values for transforms, which we'd need
    // to reliably place the label vertically centered to the grid
    style.top = y - 8
    return (
      <Text
        style={{ ...style }}
        key={i}>
        {scaleMax - i * units}
      </Text>
    )
  })
}

export function makeHorizontalGrid() {
  return getTickPositions().map(tick => {
    return (
      <View
        top={tick}
        {...styles.horizontalGrid}
        key={tick}
      />
    )
  })
}

function getTickPositions() {
  const units = config.temperatureScale.units
  const scaleMin = tempScaleObservable.value.min
  const scaleMax = tempScaleObservable.value.max
  const numberOfTicks = (scaleMax - scaleMin) * (1 / units)
  const tickDistance = config.chartHeight / numberOfTicks

  const tickPositions = []
  // for style reasons, we don't want the first and last tick
  for (let i = 1; i < numberOfTicks - 1; i++) {
    tickPositions.push(tickDistance * i)
  }
  return tickPositions
}

export function normalizeToScale(temp) {
  const scale = config.temperatureScale
  const valueRelativeToScale = (scale.high - temp) / (scale.high - scale.low)
  const scaleHeight = config.chartHeight
  return scaleHeight * valueRelativeToScale
}