import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { temperatureDaysSortedByDate } from './db'
import range from 'date-range'
import Svg,{
  G,
  Polyline,
  Rect,
  Text,
} from 'react-native-svg'
import { LocalDate } from 'js-joda'

const right = 350
const top = 10
const bottom = 350
const columnWidth = 30
const dateRow = {
  height: 30,
  width: right
}

function makeDayColumn(labelInfo) {
  return (
    <G>
      <Rect
        x={labelInfo.rightOffset}
        y={top}
        width={columnWidth}
        height={bottom - top - dateRow.height}
        fill="lightgrey"
        strokeWidth="1"
        stroke="grey"
      />
      <Text
        stroke="purple"
        fontSize="10"
        x={labelInfo.rightOffset}
        y={bottom - top - dateRow.height}
      >{labelInfo.label.split('-')[2]}</Text>
    </G>
  )
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

function determineCurvePoints(temperatureDaysSortedByDate, xAxisDatesWithRightOffset) {
  return temperatureDaysSortedByDate.map(cycleDay => {
    const x = xAxisDatesWithRightOffset.find(tick => tick.label === cycleDay.date).rightOffset
    const y = normalizeToScale(cycleDay.temperature.value)
    return [x,y].join()
  }).join(' ')
}

function normalizeToScale(temp) {
  const scale = {
    low: 33,
    high: 40
  }
  const tempInScaleDecs = (scale.high - temp) / (scale.high - scale.low)
  const scaleHeight = bottom - top
  return scaleHeight * tempInScaleDecs
}

export default class SvgExample extends Component {
  render() {
    return (
      <ScrollView horizontal={true}>
        <Svg
          height="350"
          width="2000"
        >
          {xAxisDatesWithRightOffset.map(makeDayColumn)}
          <Polyline
            points={determineCurvePoints(temperatureDaysSortedByDate, xAxisDatesWithRightOffset)}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </Svg>
      </ScrollView>
    )
  }
}