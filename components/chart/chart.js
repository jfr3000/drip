import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'

import AppLoadingView from '../common/app-loading'
import AppPage from '../common/app-page'
import AppText from '../common/app-text'

import DayColumn from './day-column'
import HorizontalGrid from './horizontal-grid'
import NoData from './no-data'
import Tutorial from './tutorial'
import YAxis from './y-axis'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { getCycleDaysSortedByDate } from '../../db'
import nothingChanged from '../../db/db-unchanged'
import { getChartFlag, scaleObservable, setChartFlag } from '../../local-storage'
import { makeColumnInfo, nfpLines } from '../helpers/chart'

import {
  CHART_COLUMN_WIDTH,
  SYMPTOMS,
  CHART_SYMPTOM_HEIGHT_RATIO,
  CHART_XAXIS_HEIGHT_RATIO
} from '../../config'
import { shared } from '../../i18n/en/labels'
import { Colors, Spacing } from '../../styles/redesign'

class CycleChart extends Component {
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

    this.checkShouldShowHint()
    this.prepareSymptomData()
  }

  componentWillUnmount() {
    this.cycleDaysSortedByDate.removeListener(this.handleDbChange)
    this.removeObvListener()
  }

  checkShouldShowHint = async () => {
    const flag = await getChartFlag()
    const shouldShowHint = flag === 'true' ? true : false
    this.setState({ shouldShowHint })
  }

  setShouldShowHint = async () => {
    await setChartFlag()
    this.setState({ shouldShowHint: false })
  }

  onLayout = ({ nativeEvent }) => {
    if (this.state.chartHeight) return false

    this.reCalculateChartInfo(nativeEvent)
    this.updateListeners(this.reCalculateChartInfo)
  }

  prepareSymptomData = () => {
    this.symptomRowSymptoms = SYMPTOMS.filter((symptomName) => {
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

    this.xAxisHeight = height * CHART_XAXIS_HEIGHT_RATIO
    const remainingHeight = height - this.xAxisHeight
    this.symptomHeight = remainingHeight * CHART_SYMPTOM_HEIGHT_RATIO
    this.symptomRowHeight = this.symptomRowSymptoms.length *
      this.symptomHeight
    this.columnHeight = remainingHeight - this.symptomRowHeight
    const chartHeight = this.shouldShowTemperatureColumn ?
      height : (this.symptomRowHeight + this.xAxisHeight)
    const numberOfColumnsToRender = Math.round(width / CHART_COLUMN_WIDTH)
    const columns = makeColumnInfo()

    this.setState({ columns, chartHeight, numberOfColumnsToRender })
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

  render() {
    const {
      chartHeight,
      chartLoaded,
      shouldShowHint,
      numberOfColumnsToRender
    } = this.state
    const hasDataToDisplay = this.chartSymptoms.length > 0

    return (
      <AppPage
        contentContainerStyle={styles.pageContainer}
        onLayout={this.onLayout}
        scrollViewStyle={styles.page}
      >
        {!hasDataToDisplay && <NoData />}
        {hasDataToDisplay && !chartHeight && !chartLoaded && <AppLoadingView />}
        <View style={styles.chartContainer}>
          {shouldShowHint && chartLoaded &&
            <Tutorial onClose={this.setShouldShowHint} />
          }
          {hasDataToDisplay && chartLoaded &&
            !this.shouldShowTemperatureColumn &&
            <View style={styles.centerItem}>
              <AppText style={styles.warning}>
                {shared.noTemperatureWarning}
              </AppText>
            </View>
          }
          {hasDataToDisplay && (
            <View style={styles.chartArea}>

              {chartHeight && chartLoaded && (
                <YAxis
                  height={this.columnHeight}
                  symptomsToDisplay={this.symptomRowSymptoms}
                  symptomsSectionHeight={this.symptomRowHeight}
                  shouldShowTemperatureColumn=
                    {this.shouldShowTemperatureColumn}
                  xAxisHeight={this.xAxisHeight}
                />
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
                 contentContainerStyle={{ height: chartHeight }}
               />
              }
              {chartHeight && chartLoaded && (
                <React.Fragment>
                  {this.shouldShowTemperatureColumn &&
                    <HorizontalGrid height={this.columnHeight} />
                  }
                </React.Fragment>
              )}
            </View>
          )}
        </View>
      </AppPage>
    )
  }
}

function LoadingMoreView({ end }) {
  return (
    <View style={styles.loadingContainer}>
      {!end && <ActivityIndicator size={'large'} color={Colors.orange}/>}
    </View>
  )
}

LoadingMoreView.propTypes = {
  end: PropTypes.bool
}

const styles = StyleSheet.create({
  chartArea: {
    flexDirection: 'row'
  },
  chartContainer: {
    flexDirection: 'column'
  },
  loadingContainer: {
    height: '100%',
    backgroundColor: Colors.tourquiseLight,
    justifyContent: 'center'
  },
  page: {
    marginVertical: Spacing.small
  },
  pageContainer: {
    paddingHorizontal: Spacing.base
  },
  warning: {
    padding: Spacing.large
  }
})

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(CycleChart)
