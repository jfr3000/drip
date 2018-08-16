import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles'
import config from './config'

export default class DotAndLine extends Component {
  render() {
    const y = this.props.y
    const exclude = this.props.exclude
    let lineToRight
    let lineToLeft

    if (this.props.leftY) {
      const middleY = ((this.props.leftY - y) / 2) + y
      const excludedLine = this.props.leftTemperatureExclude || exclude
      lineToLeft = makeLine(middleY, y, 'left', excludedLine)
    }
    if (this.props.rightY) {
      const middleY = ((y - this.props.rightY) / 2) + this.props.rightY
      const excludedLine = this.props.rightTemperatureExclude || exclude
      lineToRight = makeLine(y, middleY, 'right', excludedLine)
    }

    const dotStyle = exclude ? styles.curveDotsExcluded : styles.curveDots
    const dot = (
      <View
        position='absolute'
        top={y - (dotStyle.height / 2)}
        left={config.columnMiddle - (dotStyle.width / 2)}
        style={dotStyle}
      />
    )
    return [lineToLeft, lineToRight, dot]
  }
}

function makeLine(leftY, rightY, direction, excludeLine) {
  const colWidth = config.columnWidth
  const heightDiff = -leftY - -rightY
  const angle = Math.atan2(heightDiff, colWidth / 2)
  const lineStyle = excludeLine ? styles.curveExcluded : styles.curve
  // hypotenuse, we add 3px for good measure, because otherwise the lines
  // don't quite touch at the day border
  const h = (colWidth / 2) / Math.cos(angle) + 3
  // the rotation by default rotates from the middle of the line,
  // but we want the transform origin to be at its beginning
  // react native doesn't have transformOrigin, so we do this manually
  // if it's the right line, we put the pivot at 3/4 of the column
  // if it's to the left, at 1/4
  const pivot = direction === 'right' ? colWidth / 4 : -(colWidth / 4)
  const projectedX = -(h - colWidth) / 2 + pivot

  return (<View
    width={h}
    position='absolute'
    top={((leftY + rightY) / 2) - lineStyle.borderWidth / 2}
    left={projectedX}
    style={{
      transform: [
        { rotateZ: `${angle}rad` }
      ],
    }}
    {...lineStyle}
  />)
}