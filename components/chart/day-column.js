import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import { getCycleDay } from '../../db'

import SymptomCell from './symptom-cell'
import TemperatureColumn from './temperature-column'
import CycleDayLabel from './cycle-day-label'

import {
  symptomColorMethods,
  getTemperatureProps,
  isSymptomDataComplete,
} from '../helpers/chart'

const DayColumn = ({
  dateString,
  chartSymptoms,
  columnHeight,
  getFhmAndLtlInfo,
  setDate,
  navigate,
  shouldShowTemperatureColumn,
  symptomHeight,
  symptomRowSymptoms,
  xAxisHeight,
}) => {
  const cycleDayData = getCycleDay(dateString)
  let data = {}

  if (cycleDayData) {
    data = chartSymptoms.reduce((symptomDataToDisplay, symptom) => {
      const symptomData = cycleDayData[symptom]

      if (symptomData && symptom === 'temperature') {
        symptomDataToDisplay[symptom] = getTemperatureProps(
          symptomData,
          columnHeight,
          dateString
        )
      } else {
        if (symptomData && !symptomData.exclude) {
          // if symptomColorMethods entry doesn't exist for given symptom,
          // use 'default'
          const getSymptomColorIndex =
            symptomColorMethods[symptom] || symptomColorMethods['default']

          symptomDataToDisplay[symptom] = getSymptomColorIndex(symptomData)
        }
      }

      return symptomDataToDisplay
    }, data)
  }

  const fhmAndLtl = getFhmAndLtlInfo(
    dateString,
    data.temperature ? data.temperature.value : null,
    columnHeight
  )

  const onDaySelect = (date) => {
    setDate(date)
    navigate('CycleDay')
  }

  return (
    <TouchableOpacity onPress={() => onDaySelect(dateString)} activeOpacity={1}>
      {shouldShowTemperatureColumn && (
        <TemperatureColumn
          horizontalLinePosition={fhmAndLtl.drawLtlAt}
          isVerticalLine={fhmAndLtl.drawFhmLine}
          data={data && data.temperature}
          columnHeight={columnHeight}
        />
      )}

      <CycleDayLabel height={xAxisHeight} date={dateString} />

      {symptomRowSymptoms.map((symptom, i) => {
        const hasSymptomData = Object.prototype.hasOwnProperty.call(
          data,
          symptom
        )
        return (
          <SymptomCell
            index={i}
            key={symptom}
            symptom={symptom}
            symptomValue={hasSymptomData && data[symptom]}
            isSymptomDataComplete={
              hasSymptomData && isSymptomDataComplete(symptom, dateString)
            }
            height={symptomHeight}
          />
        )
      })}
    </TouchableOpacity>
  )
}

DayColumn.propTypes = {
  dateString: PropTypes.string.isRequired,
  chartSymptoms: PropTypes.array,
  columnHeight: PropTypes.number.isRequired,
  getFhmAndLtlInfo: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  shouldShowTemperatureColumn: PropTypes.bool,
  symptomHeight: PropTypes.number.isRequired,
  symptomRowSymptoms: PropTypes.array,
  xAxisHeight: PropTypes.number,
}

export default DayColumn
