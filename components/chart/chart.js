import React, { Component } from 'react'
import { View } from 'react-native'
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview"
import range from 'date-range'
import { LocalDate } from 'js-joda'
import { yAxis, normalizeToScale } from './y-axis'
import DayColumn from './day-column'
import { getCycleDay, cycleDaysSortedByDate } from '../../db'
import styles from './styles'
import config from './config'

const yAxisView = <View {...styles.yAxis}>{yAxis.labels}</View>

const dataProvider = new DataProvider((a,b) => {
  return Object.keys(a).some(key => a[key] != b[key])
})

const layoutProvider = new LayoutProvider(
  () => DayColumn,
  (_, item) => {
    item.height = config.chartHeight
    item.width = config.columnWidth
    return item
  }
)

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

function rowRenderer (_, item, index) {
  return (
    <DayColumn
      item={item}
      index={index}
      navigate={this.props.navigation.navigate}
      {...getInfoForNeighborColumns(index, this.columns)}
    />
  )
}

export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.columns = makeColumnInfo(config.xAxisRangeInDays)
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.columns)
    }
    this.rowRenderer = rowRenderer.bind(this)

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
        <RecyclerListView
          layoutProvider={layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this.rowRenderer}
          isHorizontal={true}
          initialNumToRender={15}
        >
        </RecyclerListView>
      </View>
    )
  }
}

function makeColumnInfo(n) {
  const xAxisDates = getPreviousDays(n).reverse().map(jsDate => {
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