import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, ActivityIndicator } from 'react-native'

import NoData from './no-data'
import AppLoadingView from '../app-loading'
import YAxis from './y-axis'
import nfpLines from './nfp-lines'
import DayColumn from './day-column'
import HorizontalGrid from './horizontal-grid'
import AppText from '../app-text'

import { getCycleDaysSortedByDate } from '../../db'
import nothingChanged from '../../db/db-unchanged'
import { scaleObservable } from '../../local-storage'
import { makeColumnInfo } from '../helpers/chart'

import config from '../../config'
import { shared } from '../../i18n/en/labels'
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
    this.shouldShowTemperatureColumn = false

    this.prepareSymptomData()
  }

  prepareSymptomData = () => {
    this.symptomRowSymptoms = config.symptoms.filter((symptomName) => {
      return this.cycleDaysSortedByDate.some(cycleDay => {
        return cycleDay[symptomName]
      })
    })
    this.chartSymptoms = [...this.symptomRowSymptoms]
    if (this.cycleDaysSortedByDate.some(day => day.temperature)) {
      this.chartSymptoms.push('temperature')
      this.shouldShowTemperatureColumn = true
    }
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
        shouldShowTemperatureColumn={this.shouldShowTemperatureColumn}
        getFhmAndLtlInfo={this.getFhmAndLtlInfo}
        xAxisHeight={this.xAxisHeight}
      />
    )
  }

  reCalculateChartInfo = (nativeEvent) => {
    const { height, width } = nativeEvent.layout
    const xAxisCoefficient = this.shouldShowTemperatureColumn ?
      config.xAxisHeightPercentage : config.xAxisHeightPercentageLarge
    const symptomCoefficient = this.shouldShowTemperatureColumn ?
      config.symptomHeightPercentage : config.symptomHeightPercentageLarge

    this.xAxisHeight = height * xAxisCoefficient
    const remainingHeight = height - this.xAxisHeight
    this.symptomHeight = remainingHeight * symptomCoefficient
    this.symptomRowHeight = this.symptomRowSymptoms.length *
      this.symptomHeight
    this.columnHeight = remainingHeight - this.symptomRowHeight
    const chartHeight = this.shouldShowTemperatureColumn ?
      height : (this.symptomRowHeight + this.xAxisHeight)

    const numberOfColumnsToRender = Math.round(width / config.columnWidth)
    const columns = makeColumnInfo()

    this.setState({ columns, chartHeight, numberOfColumnsToRender })
  }

  onLayout = ({ nativeEvent }) => {
    if (this.state.chartHeight) return

    this.reCalculateChartInfo(nativeEvent)
    this.updateListeners(this.reCalculateChartInfo)
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
    const { chartHeight, chartLoaded, numberOfColumnsToRender } = this.state
    const shouldShowChart = this.chartSymptoms.length > 0 ? true : false

    return (
      <View onLayout={this.onLayout} style={styles.container}>
        {!shouldShowChart && <NoData navigate={this.props.navigate}/>}
        {shouldShowChart && !chartHeight && !chartLoaded && <AppLoadingView />}
        <View style={styles.chartContainer}>
          {shouldShowChart && (
            <View style={styles.chartArea}>

              {chartHeight && chartLoaded && (
                <React.Fragment>
                  <YAxis
                    height={this.columnHeight}
                    symptomsToDisplay={this.symptomRowSymptoms}
                    symptomsSectionHeight={this.symptomRowHeight}
                    shouldShowTemperatureColumn=
                      {this.shouldShowTemperatureColumn}
                    xAxisHeight={this.xAxisHeight}
                  />
                  {this.shouldShowTemperatureColumn && (<HorizontalGrid
                    height={this.columnHeight}
                    startPosition={this.symptomRowHeight}
                  />)}
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
                 initialNumToRender={numberOfColumnsToRender}
                 windowSize={30}
                 onLayout={() => this.setState({chartLoaded: true})}
                 onEndReached={() => this.setState({end: true})}
                 ListFooterComponent={<LoadingMoreView end={this.state.end}/>}
                 updateCellsBatchingPeriod={800}
                 contentContainerStyle={{height: chartHeight}}
               />
              }
            </View>
          )}
        </View>
        {shouldShowChart && chartLoaded && !this.shouldShowTemperatureColumn
          && (
            <View style={styles.centerItem}>
              <AppText style={{textAlign: 'center'}}>{shared.noTemperatureWarning}</AppText>
            </View>
          )}
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
