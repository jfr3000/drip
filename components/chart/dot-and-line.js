import React from 'react'
import PropTypes from 'prop-types'
import { Path, Shape } from '@react-native-community/art'

import { Colors } from '../../styles'

import {
  CHART_COLUMN_WIDTH,
  CHART_COLUMN_MIDDLE,
  CHART_DOT_RADIUS_SYMPTOM,
  CHART_DOT_RADIUS_TEMPERATURE,
  CHART_STROKE_WIDTH,
} from '../../config'

const DotAndLine = ({
  exclude,
  leftTemperatureExclude,
  leftY,
  rightTemperatureExclude,
  rightY,
  y,
}) => {
  let excludeLeftLine, excludeRightLine, lineLeft, lineRight

  if (leftY) {
    const middleY = (leftY - y) / 2 + y
    excludeLeftLine = leftTemperatureExclude || exclude
    lineLeft = new Path().moveTo(CHART_COLUMN_MIDDLE, y).lineTo(0, middleY)
  }
  if (rightY) {
    const middleY = (y - rightY) / 2 + rightY
    excludeRightLine = rightTemperatureExclude || exclude
    lineRight = new Path()
      .moveTo(CHART_COLUMN_MIDDLE, y)
      .lineTo(CHART_COLUMN_WIDTH, middleY)
  }

  const dot = new Path()
    .moveTo(CHART_COLUMN_MIDDLE, y - CHART_DOT_RADIUS_TEMPERATURE)
    .arc(0, CHART_DOT_RADIUS_TEMPERATURE * 2, CHART_DOT_RADIUS_TEMPERATURE)
    .arc(0, CHART_DOT_RADIUS_TEMPERATURE * -2, CHART_DOT_RADIUS_TEMPERATURE)
  const dotColor = exclude ? Colors.turquoise : Colors.turquoiseDark
  const lineColorLeft = excludeLeftLine
    ? Colors.turquoise
    : Colors.turquoiseDark
  const lineColorRight = excludeRightLine
    ? Colors.turquoise
    : Colors.turquoiseDark

  return (
    <React.Fragment>
      <Shape
        d={lineLeft}
        stroke={lineColorLeft}
        strokeWidth={CHART_STROKE_WIDTH}
        key={y}
      />
      <Shape
        d={lineRight}
        stroke={lineColorRight}
        strokeWidth={CHART_STROKE_WIDTH}
        key={y + CHART_DOT_RADIUS_SYMPTOM}
      />
      <Shape
        d={dot}
        stroke={dotColor}
        strokeWidth={CHART_STROKE_WIDTH}
        fill={dotColor}
        key="dot"
      />
    </React.Fragment>
  )
}

DotAndLine.propTypes = {
  exclude: PropTypes.bool,
  leftY: PropTypes.number,
  leftTemperatureExclude: PropTypes.bool,
  rightY: PropTypes.number,
  rightTemperatureExclude: PropTypes.bool,
  y: PropTypes.number.isRequired,
}

export default DotAndLine
