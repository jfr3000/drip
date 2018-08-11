import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import styles from './styles'
import config from './config'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import setUpFertilityStatusFunc from './nfp-lines'
import { horizontalGrid } from './y-axis'
// import slowlog from 'react-native-slowlog'

const getCycleDayNumber = cycleModule().getCycleDayNumber
const label = styles.column.label
const getFhmAndLtlInfo = setUpFertilityStatusFunc()

export default class DayColumn extends Component {
  constructor(props) {
    super(props)
    // slowlog(this, /.*/, {threshold: 30})
  }
  makeDayColumn(data, index) {
    const {
      dateString,
      y,
      temperature,
      temperatureExclude,
      bleeding,
      mucus
    } = data
    const cycleDayNumber = getCycleDayNumber(dateString)
    const shortDate = dateString.split('-').slice(1).join('-')
    const nfpLineInfo = getFhmAndLtlInfo(dateString, temperature)

    //TODO move these so they are visible
    const cycleDayLabel = (
      <Text {...label.number} y={config.cycleDayNumberRowY}>
        {cycleDayNumber}
      </Text>)
    const dateLabel = (
      <Text {...label.date} y={config.dateRowY}>
        {shortDate}
      </Text>
    )
    const columnElements = []
    if (bleeding) {
      columnElements.push(
        <Icon
          name='drop'
          position='absolute'
          top = {10}
          left = {20}
          size={30}
          color='#900'
          style={{ marginTop: 20 }}
        />
      )
    }
    columnElements.push(cycleDayLabel, dateLabel, horizontalGrid)

    if(nfpLineInfo.drawFhmLine) {
      const fhmLine = (<View
        position = 'absolute'
        top={100}
        width={styles.nfpLine.strokeWidth}
        height={200}
        {...styles.nfpLine}
      />)
      columnElements.push(fhmLine)
    }

    if(nfpLineInfo.drawLtlAt) {
      console.log('yep')
      const ltlLine = (<View
        position = 'absolute'
        width={'100%'}
        top={nfpLineInfo.drawLtlAt}
        {...styles.nfpLine}
      />)
      columnElements.push(ltlLine)
    }

    if (y) {
      columnElements.push(...this.drawDotAndLine(y, temperatureExclude, index))
    }
    //   {cycleDay && cycleDay.mucus ?
    //     <Circle
    //       {...styles.mucusIcon}
    //       fill={styles.mucusIconShades[cycleDay.mucus.value]}
    //     /> : null}

    //   {y ?
    //     this.drawDotAndLines(y, cycleDay.temperature.exclude, index)
    //     : null} */}

    return React.createElement(
      TouchableOpacity,
      {
        style: styles.column.rect,
        key: index.toString(),
        onPress: () => {
          this.passDateToDayView(dateString)
        },
        activeOpacity: 0.8
      },
      columnElements
    )
  }

  drawDotAndLine(currY, exclude) {
    let lineToRight
    let lineToLeft

    function makeLine(leftY, rightY, direction, excludeLine) {
      const colWidth = config.columnWidth
      const heightDiff = -leftY - -rightY
      const angle = Math.atan2(heightDiff, colWidth / 2)
      const lineStyle = excludeLine ? styles.curveExcluded : styles.curve
      // hypotenuse
      const h = (colWidth / 2) / Math.cos(angle)
      // the rotation by default rotates from the middle of the line,
      // but we want the transform origin to be at its beginning
      // react native doesn't have transformOrigin, so we do this manually
      // if it's the right line, we put the pivot at 3/4 of the column
      // if it's to the left, at 1/4
      const pivot = direction === 'right' ? colWidth / 4 : -(colWidth / 4)
      const projectedX = -(h - colWidth) / 2 + pivot

      return (<View
        width={h}
        position = 'absolute'
        top={(leftY + rightY) / 2}
        left={projectedX}
        style={{
          transform: [
            {rotateZ: `${angle}rad`}
          ],
        }}
        {...lineStyle}
      />)
    }

    if (this.props.leftY) {
      const middleY = ((this.props.leftY - currY) / 2) + currY
      const excludedLine = this.props.leftTemperatureExclude || exclude
      lineToLeft = makeLine(middleY, currY, 'left', excludedLine)
    }
    if (this.props.rightY) {
      const middleY = ((currY - this.props.rightY) / 2) + this.props.rightY
      const excludedLine = this.props.rightTemperatureExclude || exclude
      lineToRight = makeLine(currY, middleY, 'right', excludedLine)
    }

    const dotStyle = exclude ? styles.curveDotsExcluded : styles.curveDots
    const dot = (
      <View
        position='absolute'
        top={currY - (dotStyle.height / 2)}
        left={config.columnMiddle - (dotStyle.width / 2)}
        style={dotStyle}
      />
    )
    return [lineToLeft, lineToRight, dot]
  }

  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigate('cycleDay', { cycleDay })
  }

  shouldComponentUpdate(newProps) {
    return Object.keys(newProps).some(key => newProps[key] != this.props[key])
  }

  render() {
    return this.makeDayColumn(this.props.item, this.props.index)
  }
}