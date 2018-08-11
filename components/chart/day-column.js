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
import slowlog from 'react-native-slowlog'

const getCycleDayNumber = cycleModule().getCycleDayNumber
const label = styles.column.label
const getFhmAndLtlInfo = setUpFertilityStatusFunc()

export default class DayColumn extends Component {
  constructor(props) {
    super(props)
    slowlog(this, /.*/, {threshold: 30})
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
    //   {nfpLineInfo.drawFhmLine ?
    //     <Line
    //       x1={0 + styles.nfpLine.strokeWidth / 2}
    //       y1="20"
    //       x2={0 + styles.nfpLine.strokeWidth / 2}
    //       y2={config.chartHeight - 20}
    //       {...styles.nfpLine}
    //     /> : null}
    // />)

    // onPress: () => this.passDateToDayView(dateString),

    //     <Path {...styles.bleedingIcon}
    //       d="M15 3
    //         Q16.5 6.8 25 18
    //         A12.8 12.8 0 1 1 5 18
    //         Q13.5 6.8 15 3z" />
    //     : null}

    //   {nfpLineInfo.drawLtlAt ?
    //     <Line
    //       x1="0"
    //       y1={nfpLineInfo.drawLtlAt}
    //       x2={config.columnWidth}
    //       y2={nfpLineInfo.drawLtlAt}
    //       {...styles.nfpLine}
    //     /> : null}

    if (y) {
      columnElements.push(this.drawDotAndLines(y, temperatureExclude, index))
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
        activeOpacity: 0.,
        
      },
      columnElements
    )
  }

  drawDotAndLines(currY, exclude) {
    /*       <View
        width='150%'
        borderStyle = 'solid'
        borderColor = 'red'
        borderWidth = {1}
        position = 'absolute'
        top={200}
        style={{
          transform: [{rotateZ: '30deg'}]
        }}
      />
    ) */
    let lineToRight
    let lineToLeft

    /* function makeLine(otherColY, x, excludeLine) {
      const middleY = ((otherColY - currY) / 2) + currY
      const target = [x, middleY]
      const lineStyle = excludeLine ? styles.curveExcluded : styles.curve

      return <Line
        x1={config.columnMiddle}
        y1={currY}
        x2={target[0]}
        y2={target[1]}
        {...lineStyle}
      />
    } */

 /*    if (this.props.rightY) {
      const excludedLine = this.props.rightTemperatureExclude || exclude
      lineToRight = makeLine(this.props.rightY, config.columnWidth, excludedLine)
    }
    if (this.props.leftY) {
      const excludedLine = this.props.leftTemperatureExclude || exclude
      lineToLeft = makeLine(this.props.leftY, 0, excludedLine)
    } */

    const dotStyle = exclude ? styles.curveDotsExcluded : styles.curveDots
/*     return (<G>
      {lineToRight}
      {lineToLeft}
      <Circle
        cx={config.columnMiddle}
        cy={currY}
        {...dotStyle}
      />
    </G>) */
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