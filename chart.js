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

function getPreviousDays(n) {
  const today = new Date()
  today.setHours(0); today.setMinutes(0); today.setSeconds(0); today.setMilliseconds(0)
  const twoWeeksAgo = new Date(today - (range.DAY * n))

  return range(twoWeeksAgo, today).reverse()
}

const xAxisDates = getPreviousDays(14).map(jsDate => {
  return LocalDate.of(
    jsDate.getFullYear(),
    jsDate.getMonth() + 1,
    jsDate.getDate()
  ).toString()
})

const xAxisDatesWithRightOffset = xAxisDates.map((datestring, columnIndex) => {
  const rightOffset = right - (columnWidth * (columnIndex + 1))
  return {
    label: datestring,
    rightOffset
  }
})

function determineCurvePoints() {
  return temperatureDaysSortedByDate.map(cycleDay => {
    const match = xAxisDatesWithRightOffset.find(tick => tick.label === cycleDay.date)
    const x = match.rightOffset + columnWidth / 2
    const y = normalizeToScale(cycleDay.temperature.value)
    return [x,y].join()
  }).join(' ')
}

function normalizeToScale(temp) {
  const scale = {
    low: 33,
    high: 40
  }
  const valueRelativeToScale = (scale.high - temp) / (scale.high - scale.low)
  const scaleHeight = bottom - top
  return scaleHeight * valueRelativeToScale
}

function placeBleedingSymbolsOnColumns() {
  return bleedingDaysSortedByDate.map(day => {
    // TODO handle no bleeding days, same for curve
    // TODO exclude future bleeding days (??)
    const match = xAxisDatesWithRightOffset.find(tick => {
      return tick.label === day.date
    })
    const x = match.rightOffset + columnWidth / 2
    return (<Circle key={day.date} cx={x} cy="50" r="7" fill="red"/>)
  })
}

export default class SvgExample extends Component {
  constructor(props) {
    super(props)
  }

  passDateToDayView(dateString) {
    const cycleDay = getOrCreateCycleDay(dateString)
    this.props.navigation.navigate('cycleDay', { cycleDay })
  }

  makeDayColumn(labelInfo) {
    return (
      <G key={labelInfo.label}>
        <Rect
          x={labelInfo.rightOffset}
          y={top}
          width={columnWidth}
          height={bottom - top - dateRow.height}
          fill="lightgrey"
          strokeWidth="1"
          stroke="grey"
          onPress={() => this.passDateToDayView(labelInfo.label)}
        />
        <Text
          stroke="grey"
          fontSize="10"
          x={labelInfo.rightOffset}
          y={bottom - top - dateRow.height}
        >{labelInfo.label.split('-')[2]}</Text>
      </G>
    )
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
          {xAxisDatesWithRightOffset.map(this.makeDayColumn.bind(this))}

          {placeBleedingSymbolsOnColumns()}

          <Polyline
            points={determineCurvePoints()}
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