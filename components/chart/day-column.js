import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import moment from 'moment'

import { getCycleDay } from '../../db'

import SymptomCell from './symptom-cell'
import TemperatureColumn from './temperature-column'
import CycleDayLabel from './cycle-day-label'

import {
  symptomColorMethods,
  getTemperatureProps,
  isSymptomDataComplete,
  nfpLines,
} from '../helpers/chart'

const DayColumn = ({
  dateString,
  chartSymptoms,
  columnHeight,
  setDate,
  navigate,
  shouldShowTemperatureColumn,
  symptomHeight,
  symptomRowSymptoms,
  xAxisHeight,
}) => {
  const momentDate = moment(dateString)
  const isWeekend = momentDate.day() == 0 || momentDate.day() == 6
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

  const fhmAndLtl = nfpLines()(
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
          isWeekend={isWeekend}
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
            isWeekend={isWeekend}
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
  navigate: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  shouldShowTemperatureColumn: PropTypes.bool,
  symptomHeight: PropTypes.number.isRequired,
  symptomRowSymptoms: PropTypes.array,
  xAxisHeight: PropTypes.number,
}

export default DayColumn
