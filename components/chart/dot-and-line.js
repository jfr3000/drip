import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Path, Shape } from 'react-native/Libraries/ART/ReactNativeART'

import styles from './styles'
import config from '../../config'

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
    const radius = dotStyle.r
    const dot = (
      <Shape
        d={new Path()
          .moveTo(config.columnMiddle, y - radius)
          .arc(0, radius * 2, radius)
          .arc(0, radius * -2, radius)
        }
        fill={dotStyle.fill}
        key='dot'
      />
    )
    return [lineToLeft, lineToRight, dot]
  }
}

function makeLine(currY, middleY, x, excludeLine) {
  const lineStyle = excludeLine ? styles.curveExcluded : styles.curve

  return <Shape
    stroke={lineStyle.stroke}
    d={new Path()
      .moveTo(config.columnMiddle, currY)
      .lineTo(x, middleY)
    }
    key={x.toString()}
  />
}