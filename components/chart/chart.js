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
      <View style={{flexDirection: 'row'}}>
        { yAxisView }
        <FlatList
          horizontal={true}
          inverted={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.columns}
          renderItem={({ item, index }) => {
            const cols = this.state.columns
            return (
              <DayColumn
                item={item}
                index={index}
                rightNeighbor = { index > 0 ? cols[index - 1] : undefined }
                leftNeighbor = {index < cols.length - 1 ? cols[index + 1] : undefined }
                navigate={this.props.navigation.navigate}
              />
            )
          }}
          keyExtractor={item => item.dateString}
          initialNumToRender={15}
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
    const temp = cycleDay && cycleDay.temperature && cycleDay.temperature.value
    return {
      dateString,
      cycleDay,
      y: temp ? normalizeToScale(temp) : null
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