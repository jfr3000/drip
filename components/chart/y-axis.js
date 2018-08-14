import React from 'react'
import { Text, View } from 'react-native'
import config from './config'
import styles from './styles'

function makeYAxis() {
  const scale = config.temperatureScale
  const scaleMin = scale.low
  const scaleMax = scale.high
  const numberOfTicks = (scaleMax - scaleMin) * (1 / scale.units)
  const tickDistance = config.chartHeight / numberOfTicks

  const tickPositions = []
  const labels = []
  // for style reasons, we don't want the first and last tick
  for (let i = 1; i < numberOfTicks - 1; i++) {
    const y = tickDistance * i
    const style = styles.yAxisLabel
    // this eyeballing is sadly necessary because RN does not
    // support percentage values for transforms, which we'd need
    // to reliably place the label vertically centered to the grid
    style.top = y - 8
    labels.push(
      <Text
        style={{...style}}
        key={i}>
        {scaleMax - i * scale.units}
      </Text>
    )
    tickPositions.push(y)
  }

  return {labels, tickPositions}
}

export const yAxis = makeYAxis()

export const horizontalGrid = yAxis.tickPositions.map(tick => {
  return (
    <View
      top={tick}
      {...styles.horizontalGrid}
      key={tick}
    />
  )
})

export function normalizeToScale(temp) {
  const scale = config.temperatureScale
  const valueRelativeToScale = (scale.high - temp) / (scale.high - scale.low)
  const scaleHeight = config.chartHeight
  return scaleHeight * valueRelativeToScale
}