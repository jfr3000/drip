import React, { Component } from 'react'
import { Circle, Line } from 'react-native-svg'

import styles from './styles'
import config from '../../config'

export default class DotAndLine extends Component {
  shouldComponentUpdate(newProps) {
    return Object.keys(newProps).some(key => newProps[key] != this.props[key])
  }

  render() {
    const y = this.props.y
    const exclude = this.props.exclude
    let lineToRight
    let lineToLeft

    if (this.props.leftY) {
      const middleY = ((this.props.leftY - y) / 2) + y
      const excludedLine = this.props.leftTemperatureExclude || exclude
      lineToLeft = makeLine(y, middleY, 0, excludedLine)
    }
    if (this.props.rightY) {
      const middleY = ((y - this.props.rightY) / 2) + this.props.rightY
      const excludedLine = this.props.rightTemperatureExclude || exclude
      lineToRight = makeLine(y, middleY, config.columnWidth, excludedLine)
    }

    const dotStyle = exclude ? styles.curveDotsExcluded : styles.curveDots
    const dot = (
      <Circle
        cx={config.columnMiddle}
        cy={y}
        {...dotStyle}
        key='dot'
      />
    )
    return [lineToLeft, lineToRight, dot]
  }
}

function makeLine(currY, middleY, x, excludeLine) {
  const lineStyle = excludeLine ? styles.curveExcluded : styles.curve

  return <Line
    x1={config.columnMiddle}
    y1={currY}
    x2={x}
    y2={middleY}
    {...lineStyle}
    key={x.toString()}
  />
}