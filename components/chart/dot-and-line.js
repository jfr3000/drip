import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Path, Shape } from 'react-native/Libraries/ART/ReactNativeART'

import { Colors } from '../../styles/redesign'

import {
  CHART_COLUMN_WIDTH,
  CHART_COLUMN_MIDDLE,
  CHART_DOT_RADIUS,
  CHART_STROKE_WIDTH
} from '../../config'

export default class DotAndLine extends Component {
  static propTypes = {
    exclude: PropTypes.bool,
    leftY: PropTypes.number,
    leftTemperatureExclude: PropTypes.bool,
    rightY: PropTypes.number,
    rightTemperatureExclude: PropTypes.bool,
    y: PropTypes.number.isRequired
  }

  shouldComponentUpdate(newProps) {
    return Object.keys(newProps).some(key => newProps[key] != this.props[key])
  }

  render() {
    const {
      exclude,
      leftTemperatureExclude,
      leftY,
      rightTemperatureExclude,
      rightY,
      y
    } = this.props
    let excludeLeftLine, excludeRightLine, lineLeft, lineRight

    if (leftY) {
      const middleY = ((leftY - y) / 2) + y
      excludeLeftLine = leftTemperatureExclude || exclude
      lineLeft = new Path()
        .moveTo(CHART_COLUMN_MIDDLE - CHART_DOT_RADIUS, y)
        .lineTo(0, middleY)
    }
    if (rightY) {
      const middleY = ((y - rightY) / 2) + rightY
      excludeRightLine = rightTemperatureExclude || exclude
      lineRight = new Path()
        .moveTo(CHART_COLUMN_MIDDLE + CHART_DOT_RADIUS, y)
        .lineTo(CHART_COLUMN_WIDTH, middleY)
    }

    const dot = new Path().moveTo(CHART_COLUMN_MIDDLE , y - CHART_DOT_RADIUS)
      .arc(0, CHART_DOT_RADIUS * 2, CHART_DOT_RADIUS)
      .arc(0, CHART_DOT_RADIUS * -2, CHART_DOT_RADIUS)
    const dotColor = exclude ? Colors.tourquise : Colors.tourquiseDark
    const lineColorLeft = excludeLeftLine ?
      Colors.tourquise : Colors.tourquiseDark
    const lineColorRight = excludeRightLine ?
      Colors.tourquise : Colors.tourquiseDark

    return(
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
          key={y + CHART_DOT_RADIUS}
        />
        <Shape d={dot} stroke={dotColor} strokeWidth={CHART_STROKE_WIDTH} key='dot' />
      </React.Fragment>
    )
  }
}
