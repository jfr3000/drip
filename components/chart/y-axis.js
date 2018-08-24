import React from 'react'
import { Text, View } from 'react-native'
import config from '../../config'
import styles from './styles'
import { scaleObservable } from '../../local-storage'

export function makeYAxisLabels(chartHeight) {
  const units = config.temperatureScale.units
  const scaleMax = scaleObservable.value.max
  const style = styles.yAxisLabel

  return getTickPositions(chartHeight).map((y, i) => {
    // this eyeballing is sadly necessary because RN does not
    // support percentage values for transforms, which we'd need
    // to reliably place the label vertically centered to the grid
    return (
      <Text
        style={[style, {top: y - 8}]}
        key={i}>
        {scaleMax - i * units}
      </Text>
    )
  })
}

export function makeHorizontalGrid(chartHeight) {
  return getTickPositions(chartHeight).map(tick => {
    return (
      <View
        top={tick}
        {...styles.horizontalGrid}
        key={tick}
      />
    )
  })
}

function getTickPositions(chartHeight) {
  const units = config.temperatureScale.units
  const scaleMin = scaleObservable.value.min
  const scaleMax = scaleObservable.value.max
  const numberOfTicks = (scaleMax - scaleMin) * (1 / units) + 1
  const columnHeight = chartHeight * config.columnHeightPercentage
  const tickDistance = columnHeight / numberOfTicks

  const tickPositions = []
  const margin = tickDistance / 2
  for (let i = 0; i < numberOfTicks; i++) {
    tickPositions.push(tickDistance * i + margin)
  }
  return tickPositions
}

export function normalizeToScale(temp, chartHeight) {
  const scale = scaleObservable.value
  const valueRelativeToScale = (scale.max - temp) / (scale.max - scale.min)
  const scaleHeight = chartHeight * config.columnHeightPercentage
  return scaleHeight * valueRelativeToScale
}