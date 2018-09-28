import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import range from 'date-range'
import { LocalDate } from 'js-joda'
import Svg, { G } from 'react-native-svg'
import { makeYAxisLabels, normalizeToScale, makeHorizontalGrid } from './y-axis'
import nfpLines from './nfp-lines'
import DayColumn from './day-column'
import { getCycleDay, getCycleDaysSortedByDate, getAmountOfCycleDays } from '../../db'
import styles from './styles'
import { scaleObservable } from '../../local-storage'
import config from '../../config'
import { AppText } from '../app-text'
import { shared as labels } from '../labels'
import BleedingIcon from '../../assets/bleeding'
import CervixIcon from '../../assets/cervix'
import DesireIcon from '../../assets/desire'
import MucusIcon from '../../assets/mucus'
import NoteIcon from '../../assets/note'
import PainIcon from '../../assets/pain'
import SexIcon from '../../assets/sex'

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
          symptomHeight={this.symptomHeight}
          columnHeight={this.columnHeight}
          chartHeight={this.state.chartHeight}
          symptomRowSymptoms={this.symptomRowSymptoms}
        />
      )
    }
    this.cycleDaysSortedByDate = getCycleDaysSortedByDate()
  }

  onLayout = ({ nativeEvent }) => {
    if (this.state.chartHeight) return
    const height = nativeEvent.layout.height
    this.setState({ chartHeight: height })
    this.reCalculateChartInfo = () => {
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

      this.xAxisHeight = this.state.chartHeight * config.xAxisHeightPercentage
      const remainingHeight = this.state.chartHeight - this.xAxisHeight
      this.symptomHeight = config.symptomHeightPercentage * remainingHeight
      this.symptomRowHeight = this.symptomRowSymptoms.length *
        this.symptomHeight
      this.columnHeight = remainingHeight - this.symptomRowHeight

      const chartSymptoms = [...this.symptomRowSymptoms]
      if (this.cycleDaysSortedByDate.some(day => day.temperature)) {
        chartSymptoms.push('temperature')
      }

      const columnData = this.makeColumnInfo(nfpLines(), chartSymptoms)
      this.setState({ columns: columnData })
    }

    this.cycleDaysSortedByDate.addListener(this.reCalculateChartInfo)
    this.removeObvListener = scaleObservable(this.reCalculateChartInfo, false)
  }

  componentWillUnmount() {
    this.cycleDaysSortedByDate.removeListener(this.reCalculateChartInfo)
    this.removeObvListener()
  }

  makeColumnInfo(getFhmAndLtlInfo, chartSymptoms) {
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

    const columns = xAxisDates.map(dateString => {
      const column = { dateString }
      const cycleDay = getCycleDay(dateString)
      if (!cycleDay) return column

      const symptoms = chartSymptoms.reduce((acc, symptom) => {
        if (symptom === 'bleeding' ||
          symptom === 'temperature' ||
          symptom === 'mucus' ||
          symptom === 'desire' ||
          symptom === 'note'
        ) {
          acc[symptom] = cycleDay[symptom] && cycleDay[symptom].value
        } else if (symptom === 'cervix') {
          acc.cervix = cycleDay.cervix &&
            (cycleDay.cervix.opening + cycleDay.cervix.firmness)
        } else if (symptom === 'sex') {
          // solo = 1 + partner = 2
          acc.sex = cycleDay.sex &&
            (cycleDay.sex.solo + 2 * cycleDay.sex.partner)
        } else if (symptom === 'pain') {
          // is any pain documented?
          acc.pain = cycleDay.pain &&
            Object.values(cycleDay.pain).some(x => x === true)
        }
        acc[`${symptom}Exclude`] = cycleDay[symptom] && cycleDay[symptom].exclude
        return acc
      }, {})

      const temp = symptoms.temperature
      if (temp) {
        column.y = normalizeToScale(temp, this.columnHeight)
      }

      const fhmAndLtl = getFhmAndLtlInfo(dateString, temp, this.columnHeight)
      return Object.assign(column, symptoms, fhmAndLtl)
    })

    return columns.map((col, i) => {
      const info = getInfoForNeighborColumns(i, columns)
      return Object.assign(col, info)
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
                  <Svg
                    width={styles.yAxis.width * 0.8}
                    height={this.symptomRowHeight /
                      this.symptomRowSymptoms.length * 0.8}
                    viewBox={symptomIcons[symptomName].viewBox}
                  >
                    <G fill={symptomIcons[symptomName].color}>
                      {symptomIcons[symptomName].icon}
                    </G>
                  </Svg>
                </View>
              })}
            </View>
            <View style={[styles.yAxis, {height: this.columnHeight}]}>
              {makeYAxisLabels(this.columnHeight)}
            </View>
            <View style={[styles.yAxis, {height: this.xAxisHeight}]}>
              <AppText style = {[
                styles.column.label.number,
                styles.yAxisLabels.cycleDayLabel
              ]}>
                {labels.cycleDayWithLinebreak}
              </AppText>
              <AppText style={[
                styles.column.label.date,
                styles.yAxisLabels.dateLabel
              ]}>
                {labels.date}
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

const symptomIcons = {
  'bleeding': {
    'viewBox': '10 10 320 400',
    'color': styles.iconShades.bleeding[3],
    'icon': <BleedingIcon strokeWidth={'5'}/>
  },
  'mucus': {
    'viewBox': '10 10 320 400',
    'color': styles.iconShades.mucus[4],
    'icon': <MucusIcon/>
  },
  'cervix': {
    'viewBox': '10 10 320 440',
    'color': styles.iconShades.cervix[3],
    'icon': <CervixIcon/>
  },
  'desire': {
    'viewBox': '10 10 320 380',
    'color': styles.iconShades.desire[2],
    'icon': <DesireIcon/>
  },
  'sex': {
    'viewBox': '10 10 320 400',
    'color': styles.iconShades.sex[2],
    'icon': <SexIcon/>
  },
  'pain': {
    'viewBox': '10 10 300 400',
    'color': styles.iconShades.pain[0],
    'icon': <PainIcon/>
  },
  'note': {
    'viewBox': '10 10 270 400',
    'color': styles.iconShades.note[0],
    'icon': <NoteIcon/>
  },
}