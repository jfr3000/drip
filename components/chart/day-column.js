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

const getCycleDayNumber = cycleModule().getCycleDayNumber

export default class DayColumn extends Component {
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
    const label = styles.column.label
    const dateLabel = dateString.split('-').slice(1).join('-')
    const getFhmAndLtlInfo = setUpFertilityStatusFunc()
    const nfpLineInfo = getFhmAndLtlInfo(dateString, cycleDay)

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

        {cycleDay && cycleDay.bleeding ?
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
          this.drawDotAndLines(y, cycleDay.temperature.exclude, index)
          : null
        }
        {cycleDay && cycleDay.mucus ?
          <Circle
            {...styles.mucusIcon}
            fill={styles.mucusIconShades[cycleDay.mucus.value]}
          /> : null}

        {y ?
          this.drawDotAndLines(y, cycleDay.temperature.exclude)
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

    const thereIsADotToTheRight = this.props.rightNeighbor && this.props.rightNeighbor.y
    const thereIsADotToTheLeft = this.props.leftNeighbor && this.props.leftNeighbor.y

    if (thereIsADotToTheRight) {
      const neighbor = this.props.rightNeighbor
      const excludedLine = neighbor.cycleDay.temperature.exclude || exclude
      lineToRight = makeLine(neighbor.y, config.columnWidth, excludedLine)
    }
    if (thereIsADotToTheLeft) {
      const neighbor = this.props.leftNeighbor
      const excludedLine = neighbor.cycleDay.temperature.exclude || exclude
      lineToLeft = makeLine(neighbor.y, 0, excludedLine)
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

  shouldComponentUpdate() {
    // for now, until we've solved the mysterious re-rendering
    return false
  }

  render() {
    console.log(this.props.index)
    return (
      <Svg width={config.columnWidth} height={config.chartHeight}>
        {this.makeDayColumn(this.props.item, this.props.index)}
      </Svg>
    )
  }
}