import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Surface } from 'react-native/Libraries/ART/ReactNativeART'
import { connect } from 'react-redux'

import { setDate } from '../../slices/date'

import { LocalDate } from 'js-joda'
import config from '../../config'
import { getCycleDay } from '../../db'

import SymptomCell from './symptom-cell'
import TemperatureColumn from './temperature-column'
import CycleDayLabel from './cycle-day-label'

import { normalizeToScale } from '../helpers/chart'

class DayColumn extends Component {
  constructor(props) {
    super()

    const { dateString, chartSymptoms, columnHeight } = props
    const cycleDayData = getCycleDay(dateString)
    this.data = {}

    if (cycleDayData) {
      this.data = chartSymptoms.reduce((symptomDataToDisplay, symptom, ) => {
        const symptomData = cycleDayData[symptom]

        if (symptomData && symptom === 'temperature') {
          symptomDataToDisplay[symptom] =
           this.getTemperatureProps(symptomData, columnHeight, dateString)
        } else {
          if (symptomData && ! symptomData.exclude) {
            // if symptomColorMethods entry doesn't exist for given symptom,
            // use 'default'
            const getSymptomColorIndex =
              this.symptomColorMethods[symptom] ||
              this.symptomColorMethods['default']

            symptomDataToDisplay[symptom] = getSymptomColorIndex(symptomData)
          }
        }

        return symptomDataToDisplay
      }, this.data)
    }

    this.fhmAndLtl = props.getFhmAndLtlInfo(
      props.dateString,
      this.data.temperature ? this.data.temperature.value : null,
      props.columnHeight
    )
  }

  getTemperatureProps = (symptomData, columnHeight, dateString) => {
    const extractedData = {}
    const { value, exclude } = symptomData
    const neighborTemperatureGraphPoints =
      getInfoForNeighborColumns(dateString, columnHeight)

    for (const key in neighborTemperatureGraphPoints) {
      extractedData[key] = neighborTemperatureGraphPoints[key]
    }
    return Object.assign({
      value,
      y: normalizeToScale(value, columnHeight),
      temperatureExclude: exclude,
    }, extractedData)
  }

  symptomColorMethods = {
    'mucus': (symptomData) => {
      const { feeling, texture } = symptomData
      const colorIndex = feeling + texture
      return colorIndex
    },
    'cervix': (symptomData) => {
      const { opening, firmness } = symptomData
      const isDataComplete = opening !== null && firmness !== null
      const isClosedAndHard =
        isDataComplete &&
        (opening === 0 && firmness === 0)
      const colorIndex = isClosedAndHard ? 0 : 2
      return colorIndex
    },
    'sex': (symptomData) => {
      const { solo, partner } = symptomData
      const colorIndex = (solo !== null && partner !== null) ?
        (solo + 2 * partner - 1) : 0
      return colorIndex
    },
    'bleeding': (symptomData) => {
      const { value } = symptomData
      const colorIndex = value
      return colorIndex
    },
    'default': () => { // desire, pain, mood, note
      const colorIndex = 0
      return colorIndex
    }
  }

  isSymptomDataComplete = (symptom) => {
    const { dateString } = this.props
    const cycleDayData = getCycleDay(dateString)
    const symptomData = cycleDayData[symptom]

    const dataCompletenessCheck = {
      'cervix': () => {
        const { opening, firmness } = symptomData
        return (opening !== null) && (firmness !== null)
      },
      'mucus': () => {
        const { feeling, texture } = symptomData
        return (feeling !== null) && (texture !== null)
      },
      'default': () => {
        return true
      }
    }
    return (dataCompletenessCheck[symptom] || dataCompletenessCheck['default'])()
  }

  onDaySelect = (date) => {
    this.props.setDate(date)
    this.props.navigate('CycleDay')
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { dateString,
      symptomRowSymptoms,
      columnHeight,
      xAxisHeight } = this.props

    return (
      <TouchableOpacity
        onPress={() => this.onDaySelect(dateString)}
        activeOpacity={1}
      >

        { symptomRowSymptoms.map(symptom => {
          const hasSymptomData = this.data.hasOwnProperty(symptom)
          return (
            <SymptomCell
              key={symptom}
              symptom={symptom}
              symptomValue={hasSymptomData && this.data[symptom]}
              isSymptomDataComplete={
                hasSymptomData && this.isSymptomDataComplete(symptom)
              }
              height={this.props.symptomHeight}
            />)
        }
        )}

        <Surface width={config.columnWidth} height={columnHeight}>
          <TemperatureColumn
            horizontalLinePosition={this.fhmAndLtl.drawLtlAt}
            isVerticalLine={this.fhmAndLtl.drawFhmLine}
            data={this.data && this.data.temperature}
            columnHeight={columnHeight}
          />
        </Surface>

        <CycleDayLabel
          height={xAxisHeight}
          date={dateString}
        />

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
