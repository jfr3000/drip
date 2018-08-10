import React, { Component } from 'react'
import Svg,{
  G,
  Rect,
  Text,
  Circle,
  Line,
  Path
} from 'react-native-svg'
import styles from './styles'
import config from './config'
import { getOrCreateCycleDay } from '../../db'
import cycleModule from '../../lib/cycle'
import setUpFertilityStatusFunc from './nfp-lines'
import { horizontalGrid } from './y-axis'
import slowlog from 'react-native-slowlog'

const getCycleDayNumber = cycleModule().getCycleDayNumber
const label = styles.column.label

export default class DayColumn extends Component {
  constructor(props) {
    super(props)
    this.getFhmAndLtlInfo = setUpFertilityStatusFunc()
    // slowlog(this, /.*/)
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
    const dateLabel = dateString.split('-').slice(1).join('-')
    // const nfpLineInfo = this.getFhmAndLtlInfo(dateString, temperature)
    const nfpLineInfo = {}

    return (
      <G onPress={() => this.passDateToDayView(dateString)}>
        <Rect {...styles.column.rect} />
        {horizontalGrid}
        {nfpLineInfo.drawFhmLine ?
          <Line
            x1={0 + styles.nfpLine.strokeWidth / 2}
            y1="20"
            x2={0 + styles.nfpLine.strokeWidth / 2}
            y2={config.chartHeight - 20}
            {...styles.nfpLine}
          /> : null}


        <Text {...label.number} y={config.cycleDayNumberRowY}>
          {cycleDayNumber}
        </Text>
        <Text {...label.date} y={config.dateRowY}>
          {dateLabel}
        </Text>

        {bleeding ?
          <Path {...styles.bleedingIcon}
            d="M15 3
              Q16.5 6.8 25 18
              A12.8 12.8 0 1 1 5 18
              Q13.5 6.8 15 3z" />
          : null}

        {nfpLineInfo.drawLtlAt ?
          <Line
            x1="0"
            y1={nfpLineInfo.drawLtlAt}
            x2={config.columnWidth}
            y2={nfpLineInfo.drawLtlAt}
            {...styles.nfpLine}
          /> : null}

        {y ?
          this.drawDotAndLines(y, temperatureExclude, index)
          : null
        }

        {mucus ?
          <Circle
            {...styles.mucusIcon}
            fill={styles.mucusIconShades[mucus]}
          /> : null}

        {y ?
          this.drawDotAndLines(y, temperatureExclude)
          : null}
      </G>
    )
  }

  drawDotAndLines(currY, exclude) {
    let lineToRight
    let lineToLeft

    function makeLine(otherColY, x, excludeLine) {
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
    }

    if (this.props.rightY) {
      const excludedLine = this.props.rightTemperatureExclude || exclude
      lineToRight = makeLine(this.props.rightY, config.columnWidth, excludedLine)
    }
    if (this.props.leftY) {
      const excludedLine = this.props.leftTemperatureExclude || exclude
      lineToLeft = makeLine(this.props.leftY, 0, excludedLine)
    }

    const dotStyle = exclude ? styles.curveDotsExcluded : styles.curveDots
    return (<G>
      {lineToRight}
      {lineToLeft}
      <Circle
        cx={config.columnMiddle}
        cy={currY}
        {...dotStyle}
      />
    </G>)
  }

  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigate('cycleDay', { cycleDay })
  }

  shouldComponentUpdate(newProps) {
    return Object.keys(newProps).some(key => newProps[key] != this.props[key])
  }

  render() {
    return (
      <Svg width={config.columnWidth} height={config.chartHeight}>
        {this.makeDayColumn(this.props.item, this.props.index)}
      </Svg>
    )
  }
}