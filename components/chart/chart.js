import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import range from 'date-range'
import { LocalDate } from 'js-joda'
import { makeYAxisLabels, normalizeToScale, makeHorizontalGrid } from './y-axis'
import setUpFertilityStatusFunc from './nfp-lines'
import DayColumn from './day-column'
import { getCycleDay, cycleDaysSortedByDate, getAmountOfCycleDays } from '../../db'
import styles from './styles'
import { scaleObservable } from '../../local-storage'

export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: makeColumnInfo(setUpFertilityStatusFunc()),
    }
    this.renderColumn = ({item, index}) => {
      return (
        <DayColumn
          {...item}
          index={index}
          navigate={this.props.navigation.navigate}
        />
      )
    }

    this.reCalculateChartInfo = (function(Chart) {
      return function() {
        Chart.setState({columns: makeColumnInfo(setUpFertilityStatusFunc())})
      }
    })(this)

    cycleDaysSortedByDate.addListener(this.reCalculateChartInfo)
    this.removeObvListener = scaleObservable(this.reCalculateChartInfo, false)
  }

  componentWillUnmount() {
    cycleDaysSortedByDate.removeListener(this.reCalculateChartInfo)
    this.removeObvListener()
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', marginTop: 50 }}>
        <View {...styles.yAxis}>{makeYAxisLabels()}</View>
        {makeHorizontalGrid()}
        {<FlatList
          horizontal={true}
          inverted={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.columns}
          renderItem={this.renderColumn}
          keyExtractor={item => item.dateString}
          initialNumToRender={15}
          maxToRenderPerBatch={5}
        >
        </FlatList>}
      </View>
    )
  }
}

function makeColumnInfo(getFhmAndLtlInfo) {
  let amountOfCycleDays = getAmountOfCycleDays()
  // if there's not much data yet, we want to show at least 30 days on the chart
  if (amountOfCycleDays < 30) {
    amountOfCycleDays = 30
  } else {
    // we don't want the chart to end abruptly before the first data day
    amountOfCycleDays += 5
  }
  const xAxisDates = getTodayAndPreviousDays(amountOfCycleDays).map(jsDate => {
    return LocalDate.of(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate()
    ).toString()
  })

  const columns = xAxisDates.map(dateString => {
    const cycleDay = getCycleDay(dateString)
    const symptoms = ['temperature', 'mucus', 'bleeding'].reduce((acc, symptom) => {
      acc[symptom] = cycleDay && cycleDay[symptom] && cycleDay[symptom].value
      acc[`${symptom}Exclude`] = cycleDay && cycleDay[symptom] && cycleDay[symptom].exclude
      return acc
    }, {})

    return {
      dateString,
      y: symptoms.temperature ? normalizeToScale(symptoms.temperature) : null,
      ...symptoms,
      ...getFhmAndLtlInfo(dateString, symptoms.temperature)
    }
  })

  return columns.map((col, i) => {
    const info = getInfoForNeighborColumns(i, columns)
    return Object.assign(col, info)
  })
}

function getTodayAndPreviousDays(n) {
  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  const earlierDate = new Date(today - (range.DAY * n))

  return range(earlierDate, today).reverse()
}

function getInfoForNeighborColumns(index, cols) {
  const ret = {
    rightY: null,
    rightTemperatureExclude: null,
    leftY: null,
    leftTemperatureExclude: null
  }
  const right = index > 0 ? cols[index - 1] : undefined
  const left = index < cols.length - 1 ? cols[index + 1] : undefined
  if (right && right.y) {
    ret.rightY = right.y
    ret.rightTemperatureExclude = right.temperatureExclude
  }
  if (left && left.y) {
    ret.leftY = left.y
    ret.leftTemperatureExclude = left.temperatureExclude
  }
  return ret
}