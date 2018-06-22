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
import { bleedingDaysSortedByDate, temperatureDaysSortedByDate, getOrCreateCycleDay } from '../db'

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
const dotRadius = 4
const curveColor = 'darkblue'

export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.xAxisTicks = makeXAxisTicks(cycleDaysToShow)

    this.state = {
      curveCoordinates: this.makeCurveCoordinates(),
      bleedIconCoordinates: this.makeBleedIconCoordinates()
    }

    this.setStateWithNewCurveCoordinates = (function (chartComponent) {
      return function () {
        chartComponent.setState({
          curveCoordinates: chartComponent.makeCurveCoordinates()
        })
      }
    })(this)

    this.setStateWithNewBleedIconCoordinates = (function (chartComponent) {
      return function () {
        chartComponent.setState({
          bleedIconCoordinates: chartComponent.makeBleedIconCoordinates()
        })
      }
    })(this)

    temperatureDaysSortedByDate.addListener(this.setStateWithNewCurveCoordinates)
    bleedingDaysSortedByDate.addListener(this.setStateWithNewBleedIconCoordinates)
  }

  componentWillUnmount() {
    temperatureDaysSortedByDate.removeListener(this.setStateWithNewCurveCoordinates)
    temperatureDaysSortedByDate.removeListener(this.setStateWithNewBleedIconCoordinates)
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
    return this.state.bleedIconCoordinates.map(x => {
      return (<Circle key={x} cx={x} cy="50" r="7" fill="red" />)
    })
  }

  makeCurveCoordinates() {
    return temperatureDaysSortedByDate
      .filter(cycleDayIsNotInTheFuture())
      .reduce(separateIntoContinousChunks, [[]])
      .map(makeCurveCoordinatesForChunk.bind(this))
  }

  makeBleedIconCoordinates() {
    return bleedingDaysSortedByDate
      .filter(cycleDayIsNotInTheFuture())
      .map(day => {
        const match = this.xAxisTicks.find(tick => {
          return tick.label === day.date
        })
        return match.rightOffset + columnWidth / 2
      })
  }

  makeTemperatureCurves() {
    return this.state.curveCoordinates.map(makeCurveFromPoints)
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

          { this.makeColumnGrid(this.xAxisTicks) }

          { this.placeBleedingSymbolsOnColumns() }

          { this.makeTemperatureCurves() }

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

function cycleDayIsNotInTheFuture() {
  const today = LocalDate.now()
  return function (cycleDay) {
    const cycleDayLocalDate = LocalDate.parse(cycleDay.date)
    return cycleDayLocalDate.isBefore(today) || cycleDayLocalDate.isEqual(today)
  }
}

function separateIntoContinousChunks(curveChunks, curr) {
  const lastChunk = curveChunks[curveChunks.length - 1]
  const lastSeenCycleDate = lastChunk.length && lastChunk[lastChunk.length - 1]

  if (!lastSeenCycleDate) {
    lastChunk.push(curr)
    return curveChunks
  }

  const lastSeenLocalDate = LocalDate.parse(lastSeenCycleDate.date)
  const currLocalDate = LocalDate.parse(curr.date)
  if (lastSeenLocalDate.compareTo(currLocalDate) === 1) {
    lastChunk.push(curr)
  } else {
    curveChunks.push([curr])
  }

  return curveChunks
}

function makeCurveCoordinatesForChunk(chunk) {
  return chunk
    .map(cycleDay => {
      const match = this.xAxisTicks.find(tick => tick.label === cycleDay.date)
      const x = match.rightOffset + columnWidth / 2
      const y = normalizeToScale(cycleDay.temperature.value)
      return [x, y]
    })
}

function makeCurveFromPoints(curveChunkPoints, i) {
  const pointsInPolyLineFormat = curveChunkPoints
    .map(xYPair => xYPair.join())
    .join(' ')

  return (
    <G key={i}>
      <Polyline
        points={pointsInPolyLineFormat}
        fill="none"
        stroke={curveColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      { makeDots(curveChunkPoints) }
    </G>
  )
}

function makeDots(points) {
  return points.map(([x, y], i) => <Circle cx={x} cy={y} r={dotRadius} fill={curveColor} key={i} />)
}