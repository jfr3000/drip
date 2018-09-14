import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import range from 'date-range'
import { LocalDate } from 'js-joda'
import { makeYAxisLabels, normalizeToScale, makeHorizontalGrid } from './y-axis'
import nfpLines from './nfp-lines'
import DayColumn from './day-column'
import { getCycleDay, cycleDaysSortedByDate, getAmountOfCycleDays } from '../../db'
import styles from './styles'
import { scaleObservable } from '../../local-storage'
import config from '../../config'
import { AppText } from '../app-text'

export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.renderColumn = ({item, index}) => {
      return (
        <DayColumn
          {...item}
          index={index}
          navigate={this.props.navigate}
          chartHeight={this.state.chartHeight}
        />
      )
    }
  }

  onLayout = ({ nativeEvent }) => {
    if (this.state.chartHeight) return
    const height = nativeEvent.layout.height
    this.setState({ chartHeight: height })
    this.reCalculateChartInfo = () => {
      this.setState({ columns: this.makeColumnInfo(nfpLines(height)) })
    }

    cycleDaysSortedByDate.addListener(this.reCalculateChartInfo)
    this.removeObvListener = scaleObservable(this.reCalculateChartInfo, false)
  }

  componentWillUnmount() {
    cycleDaysSortedByDate.removeListener(this.reCalculateChartInfo)
    this.removeObvListener()
  }

  makeColumnInfo(getFhmAndLtlInfo) {
    let amountOfCycleDays = getAmountOfCycleDays()
    // if there's not much data yet, we want to show at least 30 days on the chart
    if (amountOfCycleDays < 30) {
      amountOfCycleDays = 30
    } else {
      // we don't want the chart to end abruptly before the first data day
      amountOfCycleDays += 5
    }
    const jsDates = getTodayAndPreviousDays(amountOfCycleDays)
    const xAxisDates = jsDates.map(jsDate => {
      return LocalDate.of(
        jsDate.getFullYear(),
        jsDate.getMonth() + 1,
        jsDate.getDate()
      ).toString()
    })
    const chartSymptoms = [
      'bleeding',
      'temperature',
      'mucus',
      'cervix',
      'sex',
      'desire',
      'pain',
      'note'
    ].filter((symptomName) => {
      return cycleDaysSortedByDate.some(cycleDay => cycleDay[symptomName])
    })

    const columns = xAxisDates.map(dateString => {
      const cycleDay = getCycleDay(dateString)
      const symptoms = chartSymptoms.reduce((acc, symptom) => {
        if (symptom === 'bleeding' ||
          symptom === 'temperature' ||
          symptom === 'mucus' ||
          symptom === 'desire' ||
          symptom === 'note'
        ) {
          acc[symptom] = cycleDay && cycleDay[symptom] && cycleDay[symptom].value
        } else if (symptom === 'cervix') {
          acc[symptom] = cycleDay && cycleDay['cervix'] && (cycleDay['cervix'].opening + cycleDay['cervix'].firmness)
        } else if (symptom === 'sex') {
          // solo = 1 + partner = 2
          acc[symptom] = cycleDay && cycleDay['sex'] && (cycleDay['sex'].solo + cycleDay['sex'].partner)
        } else if (symptom === 'pain') {
          // is any pain documented?
          acc[symptom] = cycleDay && cycleDay['pain'] && Object.values(cycleDay['pain']).some(x => x === true)
        }
        acc[`${symptom}Exclude`] = cycleDay && cycleDay[symptom] && cycleDay[symptom].exclude
        return acc
      }, {})

      const temp = symptoms.temperature
      const columnHeight = this.state.chartHeight * config.columnHeightPercentage
      return {
        dateString,
        y: temp ? normalizeToScale(temp, columnHeight) : null,
        symptoms,
        ...getFhmAndLtlInfo(dateString, temp)
      }
    })

    return columns.map((col, i) => {
      const info = getInfoForNeighborColumns(i, columns)
      return Object.assign(col, info)
    })
  }

  render() {
    let columnHeight
    let symptomRowHeight
    if (this.state.chartHeight) {
      columnHeight = this.state.chartHeight * config.columnHeightPercentage
      symptomRowHeight = this.state.chartHeight * config.symptomRowHeightPercentage
    }
    return (
      <View
        onLayout={this.onLayout}
        style={{ flexDirection: 'row', flex: 1 }}
      >
        {!this.state.chartLoaded &&
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <AppText>Loading...</AppText>
          </View>
        }

        {this.state.chartHeight && this.state.chartLoaded &&
          <View
            style={[styles.yAxis, {
              height: columnHeight,
              marginTop: symptomRowHeight
            }]}
          >
            {makeYAxisLabels(columnHeight)}
          </View>}

        {this.state.chartHeight && this.state.chartLoaded && makeHorizontalGrid(columnHeight, symptomRowHeight)}

        {this.state.chartHeight &&
          <FlatList
            horizontal={true}
            inverted={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.columns}
            renderItem={this.renderColumn}
            keyExtractor={item => item.dateString}
            initialNumToRender={15}
            maxToRenderPerBatch={5}
            onLayout={() => this.setState({chartLoaded: true})}
          />
        }
      </View>
    )
  }
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