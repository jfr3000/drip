import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity
} from 'react-native'
import {
  Surface,
  Group as G,
  Path,
  Shape
} from 'react-native/Libraries/ART/ReactNativeART'
import { connect } from 'react-redux'

import { setDate } from '../../slices/date'

import { LocalDate } from 'js-joda'
import moment from 'moment'
import styles from './styles'
import config from '../../config'
import cycleModule from '../../lib/cycle'
import { getCycleDay } from '../../db'
import DotAndLine from './dot-and-line'
import { normalizeToScale } from './y-axis'

const label = styles.column.label

class DayColumn extends Component {
  constructor(props) {
    super()

    const { dateString, columnHeight, chartSymptoms } = props
    const cycleDayData = getCycleDay(dateString)
    this.data = {}

    if (cycleDayData) {
      this.data = chartSymptoms.reduce((symptomDataToDisplay, symptom) => {
        const symptomData = cycleDayData[symptom]

        if (symptomData && !this.isSymptomExcluded(symptomData)) {
          symptomDataToDisplay[symptom] = {}
          switch (symptom) {
          case 'temperature': {
            symptomDataToDisplay[symptom].data = symptomData.value
            symptomDataToDisplay.y =
              normalizeToScale(symptomData.value, columnHeight)
            const neighbourTemperatureValue =
              getInfoForNeighborColumns(dateString, columnHeight)
            for (const key in neighbourTemperatureValue) {
              symptomDataToDisplay[key] = neighbourTemperatureValue[key]
            }
            break
          }
          case 'cervix':
            symptomDataToDisplay[symptom].data =
              (symptomData.opening + symptomData.firmness) > 0 ? 2 : 0
            symptomDataToDisplay[symptom].isComplete =
              this.isCervixDataComplete(symptomData)
            break
          case 'mucus':
            symptomDataToDisplay[symptom].data =
              (symptomData.feeling + symptomData.texture) > 0 ? 2 : 0
            symptomDataToDisplay[symptom].isComplete =
              this.isMucusDataComplete(symptomData)
            break
          case 'sex':
            symptomDataToDisplay[symptom].data =
              symptomData.solo + 2 * symptomData.partner - 1
            break
          case 'bleeding':
          case 'desire':
            symptomDataToDisplay[symptom].data = symptomData.value
            break
          default: // pain, mood, note
            symptomDataToDisplay[symptom].data = 0
          }
        }

        return symptomDataToDisplay
      }, this.data)
    }

    this.fhmAndLtl = props.getFhmAndLtlInfo(
      props.dateString,
      this.data.temperature,
      props.columnHeight
    )
  }

  isSymptomExcluded = (symptomData) => {
    return symptomData && symptomData.exclude ? symptomData.exclude : false
  }

  isCervixDataComplete = (symptomData) =>
    (symptomData.opening != null) && (symptomData.firmness != null)

  isMucusDataComplete = (symptomData) =>
    (symptomData.feeling != null) && (symptomData.texture != null)

  onDaySelect = (date) => {
    this.props.setDate(date)
    this.props.navigate('CycleDay')
  }

  shouldComponentUpdate() {
    return false
  }

  drawSypmtom = (symptom) => {

    const { symptomHeight } = this.props
    const shouldDrawSymptom = this.data.hasOwnProperty(symptom)
    const styleParent = [styles.symptomRow, {height: symptomHeight}]

    if (shouldDrawSymptom) {
      const styleSymptom = styles.iconShades[symptom]
      const symptomData = this.data[symptom]

      const isDataIncomplete = !symptomData.isComplete
      const isMucusOrCervix = (symptom === 'mucus') || (symptom === 'cervix')

      const backgroundColor = ( isMucusOrCervix && isDataIncomplete) ?
        'white' : styleSymptom[symptomData.data]
      const borderWidth = ( isMucusOrCervix && isDataIncomplete) ? 2 : 0
      const borderColor = styleSymptom[0]

      const styleChild = [styles.symptomIcon, {
        backgroundColor,
        borderColor,
        borderWidth
      }]

      return (
        <View style={styleParent} key={symptom}>
          {shouldDrawSymptom && <View style={styleChild} />}
        </View>
      )
    } else {
      return (
        <View style={styleParent} key={symptom} />
      )
    }
  }

  render() {
    const columnElements = []
    const { dateString,
      symptomRowSymptoms,
      chartHeight,
      columnHeight,
      xAxisHeight } = this.props


    if(this.fhmAndLtl.drawLtlAt) {
      const ltlLine = (<Shape
        stroke={styles.nfpLine.stroke}
        strokeWidth={styles.nfpLine.strokeWidth}
        d={new Path()
          .moveTo(0, this.fhmAndLtl.drawLtlAt)
          .lineTo(config.columnWidth, this.fhmAndLtl.drawLtlAt)
        }
        key='ltl'
      />)
      columnElements.push(ltlLine)
    }

    if (this.fhmAndLtl.drawFhmLine) {
      const x = styles.nfpLine.strokeWidth / 2
      const fhmLine = (<Shape
        fill="red"
        stroke={styles.nfpLine.stroke}
        strokeWidth={styles.nfpLine.strokeWidth}
        d={new Path().moveTo(x, x).lineTo(x, columnHeight)}
        key='fhm'
      />)
      columnElements.push(fhmLine)
    }

    if (this.data.y) {
      columnElements.push(
        <DotAndLine
          y={this.data.y}
          exclude={this.data.temperatureExclude}
          rightY={this.data.rightY}
          rightTemperatureExclude={this.data.rightTemperatureExclude}
          leftY={this.data.leftY}
          leftTemperatureExclude={this.data.leftTemperatureExclude}
          key='dotandline'
        />
      )
    }

    const cycleDayNumber = cycleModule().getCycleDayNumber(dateString)
    const dayDate = LocalDate.parse(dateString)
    const shortDate = dayDate.dayOfMonth() === 1 ?
      moment(dateString, "YYYY-MM-DD").format('MMM')
      :
      moment(dateString, "YYYY-MM-DD").format('Do')
    const boldDateLabel = dayDate.dayOfMonth() === 1 ? {fontWeight: 'bold'} : {}

    const cycleDayLabel = (
      <Text style = {label.number}>
        {cycleDayNumber ? cycleDayNumber : ' '}
      </Text>)
    const dateLabel = (
      <Text style = {[label.date, boldDateLabel]}>
        {shortDate}
      </Text>
    )

    const column = (
      <G>
        <Shape
          stroke={styles.column.stroke.color}
          strokeWidth={styles.column.stroke.width}
          d={new Path().lineTo(0, chartHeight)}
        />
        { columnElements }
      </G>
    )

    return (
      <TouchableOpacity
        onPress={() => this.onDaySelect(dateString)}
        activeOpacity={1}
      >
        <View>
          {symptomRowSymptoms.map(symptom => this.drawSypmtom(symptom))}
        </View>

        <Surface width={config.columnWidth} height={columnHeight}>
          {column}
        </Surface>

        <View style={{height: xAxisHeight}}>
          {cycleDayLabel}
          {dateLabel}
        </View>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    setDate: (date) => dispatch(setDate(date)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(DayColumn)


function getInfoForNeighborColumns(dateString, columnHeight) {
  const ret = {
    rightY: null,
    rightTemperatureExclude: null,
    leftY: null,
    leftTemperatureExclude: null
  }
  const target = LocalDate.parse(dateString)
  const dayBefore = target.minusDays(1).toString()
  const dayAfter = target.plusDays(1).toString()
  const cycleDayBefore = getCycleDay(dayBefore)
  const cycleDayAfter = getCycleDay(dayAfter)
  if (cycleDayAfter && cycleDayAfter.temperature) {
    ret.rightY = normalizeToScale(cycleDayAfter.temperature.value, columnHeight)
    ret.rightTemperatureExclude = cycleDayAfter.temperature.exclude
  }
  if (cycleDayBefore && cycleDayBefore.temperature) {
    ret.leftY = normalizeToScale(cycleDayBefore.temperature.value, columnHeight)
    ret.leftTemperatureExclude = cycleDayBefore.temperature.exclude
  }

  return ret
}
