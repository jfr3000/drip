import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import range from 'date-range'
import Svg,{
  G,
  Polyline,
  Rect,
  Text,
  Circle
} from 'react-native-svg'
import { LocalDate } from 'js-joda'
import { bleedingDaysSortedByDate, temperatureDaysSortedByDate, getOrCreateCycleDay } from './db'

const right = 600
const top = 10
const bottom = 350
const columnWidth = 30
const dateRow = {
  height: 30,
  width: right
}
const temperatureScale = {
  low: 33,
  high: 40
}
const cycleDaysToShow = 40

export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.xAxisTicks = makeXAxisTicks(cycleDaysToShow)
  }

  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigation.navigate('cycleDay', { cycleDay })
  }

  makeDayColumn(columnInfo) {
    return (
      <G key={columnInfo.label}>
        <Rect
          x={columnInfo.rightOffset}
          y={top}
          width={columnWidth}
          height={bottom - top - dateRow.height}
          fill="lightgrey"
          strokeWidth="1"
          stroke="grey"
          onPress={() => this.passDateToDayView(columnInfo.label)}
        />
        <Text
          stroke="grey"
          fontSize="10"
          x={columnInfo.rightOffset}
          y={bottom - top - dateRow.height}
        >{columnInfo.label.split('-')[2]}</Text>
      </G>
    )
  }

  makeColumnGrid(xAxisTicks) {
    return xAxisTicks.map(this.makeDayColumn.bind(this))
  }

  placeBleedingSymbolsOnColumns() {
    return bleedingDaysSortedByDate.map(day => {
      // TODO handle no bleeding days, same for curve
      // TODO exclude future bleeding days (??)
      const match = this.xAxisTicks.find(tick => {
        return tick.label === day.date
      })
      const x = match.rightOffset + columnWidth / 2
      return (<Circle key={day.date} cx={x} cy="50" r="7" fill="red" />)
    })
  }

  determineCurvePoints() {
    return temperatureDaysSortedByDate.map(cycleDay => {
      const match = this.xAxisTicks.find(tick => tick.label === cycleDay.date)
      const x = match.rightOffset + columnWidth / 2
      const y = normalizeToScale(cycleDay.temperature.value)
      return [x, y].join()
    }).join(' ')
  }

  componentDidMount() {
    this.scrollContainer.scrollToEnd()
  }


  render() {
    return (
      <ScrollView
        ref={(scroll) => {
          if (scroll) this.scrollContainer = scroll
        }}
        horizontal={true}>

        <Svg
          height="350"
          width={right}
          // the svg is not complete on 'componentDidMount' = why?
          // not sure if this is the right event, for now a hack
          // because there is no 'onLoad' attribute
          // we scroll to the very left because we want to show the most recent data
          onLayout={() => this.scrollContainer.scrollToEnd()}
        >

          {this.makeColumnGrid(this.xAxisTicks)}

          {this.placeBleedingSymbolsOnColumns()}

          <Polyline
            points={ this.determineCurvePoints() }
            fill="none"
            stroke="darkblue"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </Svg>
      </ScrollView>
    )
  }
}

function makeXAxisTicks(n) {
  const xAxisDates = getPreviousDays(n).map(jsDate => {
    return LocalDate.of(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate()
    ).toString()
  })

  return xAxisDates.map((datestring, columnIndex) => {
    const rightOffset = right - (columnWidth * (columnIndex + 1))
    return {
      label: datestring,
      rightOffset
    }
  })
}

function getPreviousDays(n) {
  const today = new Date()
  today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0)
  const twoWeeksAgo = new Date(today - (range.DAY * n))

  return range(twoWeeksAgo, today).reverse()
}

function normalizeToScale(temp) {
  const valueRelativeToScale = (temperatureScale.high - temp) / (temperatureScale.high - temperatureScale.low)
  const scaleHeight = bottom - top
  return scaleHeight * valueRelativeToScale
}