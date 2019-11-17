import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { LocalDate } from 'js-joda'
import YAxis, { makeHorizontalGrid } from './y-axis'
import nfpLines from './nfp-lines'
import DayColumn from './day-column'
import { getCycleDaysSortedByDate, getAmountOfCycleDays } from '../../db'
import styles from './styles'
import { scaleObservable } from '../../local-storage'
import config from '../../config'

import AppLoadingView from '../app-loading'

import nothingChanged from '../../db/db-unchanged'

export default class CycleChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.cycleDaysSortedByDate = getCycleDaysSortedByDate()
    this.getFhmAndLtlInfo = nfpLines()
  }

  renderColumn = ({ item, index }) => {
    return (
      <DayColumn
        dateString={item}
        index={index}
        navigate={this.props.navigate}
        symptomHeight={this.symptomHeight}
        columnHeight={this.columnHeight}
        chartHeight={this.state.chartHeight}
        symptomRowSymptoms={this.symptomRowSymptoms}
        chartSymptoms={this.chartSymptoms}
        getFhmAndLtlInfo={this.getFhmAndLtlInfo}
      />
    )
  }

  onLayout = ({ nativeEvent }) => {
    if (this.state.chartHeight) return
    const height = nativeEvent.layout.height
    const reCalculateChartInfo = () => {
      // how many symptoms need to be displayed on the chart's upper symptom row?
      this.symptomRowSymptoms = [
        'bleeding',
        'mucus',
        'cervix',
        'sex',
        'desire',
        'pain',
        'mood',
        'note'
      ].filter((symptomName) => {
        return this.cycleDaysSortedByDate.some(cycleDay => {
          return cycleDay[symptomName]
        })
      })

      this.xAxisHeight = height * config.xAxisHeightPercentage
      const remainingHeight = height - this.xAxisHeight
      this.symptomHeight = config.symptomHeightPercentage * remainingHeight
      this.symptomRowHeight = this.symptomRowSymptoms.length *
        this.symptomHeight
      this.columnHeight = remainingHeight - this.symptomRowHeight

      this.chartSymptoms = [...this.symptomRowSymptoms]
      if (this.cycleDaysSortedByDate.some(day => day.temperature)) {
        this.chartSymptoms.push('temperature')
      }

      const columnData = this.makeColumnInfo()
      this.setState({
        columns: columnData,
        chartHeight: height
      })
    }

    reCalculateChartInfo()
    this.updateListeners(reCalculateChartInfo)
  }

  updateListeners(dataUpdateHandler) {
    // remove existing listeners
    if(this.handleDbChange) {
      this.cycleDaysSortedByDate.removeListener(this.handleDbChange)
    }
    if (this.removeObvListener) this.removeObvListener()

    this.handleDbChange = (_, changes) => {
      if (nothingChanged(changes)) return
      dataUpdateHandler()
    }

    this.cycleDaysSortedByDate.addListener(this.handleDbChange)
    this.removeObvListener = scaleObservable(dataUpdateHandler, false)
  }

  componentWillUnmount() {
    this.cycleDaysSortedByDate.removeListener(this.handleDbChange)
    this.removeObvListener()
  }

  makeColumnInfo() {
    let amountOfCycleDays = getAmountOfCycleDays()
    // if there's not much data yet, we want to show at least 30 days on the chart
    if (amountOfCycleDays < 30) {
      amountOfCycleDays = 30
    } else {
      // we don't want the chart to end abruptly before the first data day
      amountOfCycleDays += 5
    }
    const localDates = getTodayAndPreviousDays(amountOfCycleDays)
    return localDates.map(localDate => localDate.toString())
  }

  render() {
    const { chartHeight, chartLoaded } = this.state
    return (
      <View
        onLayout={this.onLayout}
        style={{ flexDirection: 'row', flex: 1 }}
      >
        {!chartLoaded && <AppLoadingView />}

        {chartHeight && chartLoaded && (
          <YAxis
            height={this.columnHeight}
            symptomsToDisplay={this.symptomRowSymptoms}
            symptomsSectionHeight={this.symptomRowHeight}
          />
        )}

        {chartHeight && chartLoaded &&
          makeHorizontalGrid(this.columnHeight, this.symptomRowHeight)
        }

        {chartHeight &&
          <FlatList
            horizontal={true}
            inverted={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.columns}
            renderItem={this.renderColumn}
            keyExtractor={item => item}
            initialNumToRender={15}
            windowSize={30}
            onLayout={() => this.setState({chartLoaded: true})}
            onEndReached={() => this.setState({end: true})}
            ListFooterComponent={<LoadingMoreView end={this.state.end}/>}
            updateCellsBatchingPeriod={800}
          />
        }
      </View>
    )
  }
}

function LoadingMoreView(props) {
  return (
    <View style={styles.loadingMore}>
      {!props.end &&
        <ActivityIndicator size={'large'} color={'white'}/>
      }
    </View>
  )
}

function getTodayAndPreviousDays(n) {
  const today = LocalDate.now()
  const targetDate = today.minusDays(n)

  function getDaysInRange(currDate, range) {
    if (currDate.isBefore(targetDate)) {
      return range
    } else {
      range.push(currDate)
      const next = currDate.minusDays(1)
      return getDaysInRange(next, range)
    }
  }

  return getDaysInRange(today, [])
}
