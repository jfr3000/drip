import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, ActivityIndicator } from 'react-native'

import AppLoadingView from '../app-loading'
import YAxis from './y-axis'
import nfpLines from './nfp-lines'
import DayColumn from './day-column'
import HorizontalGrid from './horizontal-grid'

import { getCycleDaysSortedByDate } from '../../db'
import nothingChanged from '../../db/db-unchanged'
import { scaleObservable } from '../../local-storage'
import { makeColumnInfo } from '../helpers/chart'

import config from '../../config'

import styles from './styles'

export default class CycleChart extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    end: PropTypes.bool
  }

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

      const columnData = makeColumnInfo()
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

  render() {
    const { chartHeight, chartLoaded } = this.state
    return (
      <View
        onLayout={this.onLayout}
        style={styles.container}
      >
        {!chartLoaded && <AppLoadingView />}

        {chartHeight && chartLoaded && (
          <React.Fragment>
            <YAxis
              height={this.columnHeight}
              symptomsToDisplay={this.symptomRowSymptoms}
              symptomsSectionHeight={this.symptomRowHeight}
            />
            <HorizontalGrid
              height={this.columnHeight}
              startPosition={this.symptomRowHeight}
            />
          </React.Fragment>
        )}

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

function LoadingMoreView({ end }) {
  return (
    <View style={styles.loadingMore}>
      {!end && <ActivityIndicator size={'large'} color={'white'}/>}
    </View>
  )
}

LoadingMoreView.propTypes = {
  end: PropTypes.bool
}
