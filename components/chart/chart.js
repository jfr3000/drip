import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import range from 'date-range'
import { LocalDate } from 'js-joda'
import { yAxis, normalizeToScale } from './y-axis'
import DayColumn from './day-column'
import { getCycleDay, cycleDaysSortedByDate } from '../../db'
import styles from './styles'
import config from './config'

const yAxisView = <View {...styles.yAxis}>{yAxis.labels}</View>

export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: makeColumnInfo(config.xAxisRangeInDays)
    }
    this.renderColumn = ({item, index}) => {
      return (
        <DayColumn
          item={item}
          index={index}
          navigate={this.props.navigation.navigate}
          {...getInfoForNeighborColumns(index, this.state.columns)}
        />
      )
    }

    this.reCalculateChartInfo = (function(Chart) {
      return function() {
        Chart.setState({columns: makeColumnInfo(config.xAxisRangeInDays)})
      }
    })(this)

    cycleDaysSortedByDate.addListener(this.reCalculateChartInfo)
  }

  componentWillUnmount() {
    cycleDaysSortedByDate.removeListener(this.reCalculateChartInfo)
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {yAxisView}
        <FlatList
          horizontal={true}
          inverted={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.columns}
          renderItem={this.renderColumn}
          keyExtractor={item => item.dateString}
          initialNumToRender={15}
          maxToRenderPerBatch={5}
        >
        </FlatList>
      </View>
    )
  }
}

function makeColumnInfo(n) {
  const xAxisDates = getPreviousDays(n).map(jsDate => {
    return LocalDate.of(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate()
    ).toString()
  })

  return xAxisDates.map(dateString => {
    const cycleDay = getCycleDay(dateString)
    const symptoms = ['temperature', 'mucus', 'bleeding'].reduce((acc, symptom) => {
      acc[symptom] = cycleDay && cycleDay[symptom] && cycleDay[symptom].value
      acc[`${symptom}Exclude`] = cycleDay && cycleDay[symptom] && cycleDay[symptom].exclude
      return acc
    }, {})

    return {
      dateString,
      y: symptoms.temperature ? normalizeToScale(symptoms.temperature) : null,
      ...symptoms
    }
  })
}

function getPreviousDays(n) {
  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  const earlierDate = new Date(today - (range.DAY * n))

  return range(earlierDate, today).reverse()
}

function getInfoForNeighborColumns(index, cols) {
  const ret = {}
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