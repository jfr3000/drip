import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import range from 'date-range'
import { LocalDate } from 'js-joda'
import { Surface } from 'react-native/Libraries/ART/ReactNativeART'
import { makeYAxisLabels, makeHorizontalGrid } from './y-axis'
import nfpLines from './nfp-lines'
import DayColumn from './day-column'
import { getCycleDaysSortedByDate, getAmountOfCycleDays } from '../../db'
import styles from './styles'
import { scaleObservable } from '../../local-storage'
import config from '../../config'
import AppText from '../app-text'
import { shared as labels } from '../../i18n/en/labels'
import DripIcon from '../../assets/drip-icons'
import CycleDayIcon from '../../assets/home-circle'
import nothingChanged from '../../db/db-unchanged'

const symptomIcons = {
  bleeding: <DripIcon size={16} name='drip-icon-bleeding' color={styles.iconShades.bleeding[3]}/>,
  mucus: <DripIcon size={16} name='drip-icon-mucus' color={styles.iconShades.mucus[4]}/>,
  cervix: <DripIcon size={16} name='drip-icon-cervix' color={styles.iconShades.cervix[3]}/>,
  desire: <DripIcon size={16} name='drip-icon-desire' color={styles.iconShades.desire[2]}/>,
  sex: <DripIcon size={16} name='drip-icon-sex' color={styles.iconShades.sex[2]}/>,
  pain: <DripIcon size={16} name='drip-icon-pain' color={styles.iconShades.pain[0]}/>,
  note: <DripIcon size={16} name='drip-icon-note' color={styles.iconShades.note[0]}/>
}

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

      const columnData = this.makeColumnInfo(nfpLines(), this.chartSymptoms)
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
    const jsDates = getTodayAndPreviousDays(amountOfCycleDays)
    return jsDates.map(jsDate => {
      return LocalDate.of(
        jsDate.getFullYear(),
        jsDate.getMonth() + 1,
        jsDate.getDate()
      ).toString()
    })
  }

  render() {
    return (
      <View
        onLayout={this.onLayout}
        style={{ flexDirection: 'row', flex: 1 }}
      >
        {!this.state.chartLoaded &&
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <AppText>{labels.loading}</AppText>
          </View>
        }

        {this.state.chartHeight && this.state.chartLoaded &&
          <View>
            <View style={[styles.yAxis, {height: this.symptomRowHeight}]}>
              {this.symptomRowSymptoms.map(symptomName => {
                return <View
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                  key={symptomName}
                  width={styles.yAxis.width}
                  height={this.symptomRowHeight /
                    this.symptomRowSymptoms.length}
                >
                  {symptomIcons[symptomName]}
                </View>
              })}
            </View>
            <View style={[styles.yAxis, {height: this.columnHeight}]}>
              {makeYAxisLabels(this.columnHeight)}
            </View>
            <View style={[styles.yAxis, { alignItems: 'center', justifyContent: 'center' }]}>
              <Surface
                width={styles.yAxis.width * 0.8}
                height={styles.yAxis.width * 0.8}
              >
                <CycleDayIcon
                  strokeWidth={10}
                  scale={0.12}
                />
              </Surface>
              <AppText style={[
                styles.column.label.date,
                styles.yAxisLabels.dateLabel
              ]}>
                {labels.date.toLowerCase()}
              </AppText>
            </View>
          </View>}


        {this.state.chartHeight && this.state.chartLoaded &&
          makeHorizontalGrid(this.columnHeight, this.symptomRowHeight)
        }

        {this.state.chartHeight &&
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
  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  const earlierDate = new Date(today - (range.DAY * n))

  return range(earlierDate, today).reverse()
}
