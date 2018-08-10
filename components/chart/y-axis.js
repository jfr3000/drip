import React from 'react'
import { Text as ReactNativeText } from 'react-native'
import { Line } from 'react-native-svg'
import config from './config'
import styles from './styles'

function makeYAxis() {
  const scaleMin = config.temperatureScale.low
  const scaleMax = config.temperatureScale.high
  const numberOfTicks = (scaleMax - scaleMin) * 2
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
      <ReactNativeText
        style={{...style}}
        key={i}>
        {scaleMax - i * 0.5}
      </ReactNativeText>
    )
    tickPositions.push(y)
  }

  return {labels, tickPositions}
}

export const yAxis = makeYAxis()

export const horizontalGrid = yAxis.tickPositions.map(tick => {
  return (
    <Line
      x1={0}
      y1={tick}
      x2={config.columnWidth}
      y2={tick}
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