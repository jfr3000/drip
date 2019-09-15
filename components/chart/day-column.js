import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { setDate } from '../../slices/date'
import { navigate } from '../../slices/navigation'

import { getCycleDay } from '../../db'

import SymptomCell from './symptom-cell'
import TemperatureColumn from './temperature-column'
import CycleDayLabel from './cycle-day-label'

import {
  symptomColorMethods,
  getTemperatureProps,
  isSymptomDataComplete
} from '../helpers/chart'

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
           getTemperatureProps(symptomData, columnHeight, dateString)
        } else {
          if (symptomData && ! symptomData.exclude) {
            // if symptomColorMethods entry doesn't exist for given symptom,
            // use 'default'
            const getSymptomColorIndex =
              symptomColorMethods[symptom] || symptomColorMethods['default']

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
                hasSymptomData && isSymptomDataComplete(symptom, dateString)
              }
              height={this.props.symptomHeight}
            />)
        }
        )}

        <TemperatureColumn
          horizontalLinePosition={this.fhmAndLtl.drawLtlAt}
          isVerticalLine={this.fhmAndLtl.drawFhmLine}
          data={this.data && this.data.temperature}
          columnHeight={columnHeight}
        />

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
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(DayColumn)
