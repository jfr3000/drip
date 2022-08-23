import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import SymptomIcon from './symptom-icon'
import TickList from './tick-list'
import ChartLegend from './chart-legend'

import { CHART_YAXIS_WIDTH } from '../../config'

const YAxis = ({
  height,
  symptomsToDisplay,
  symptomsSectionHeight,
  shouldShowTemperatureColumn,
  xAxisHeight,
}) => {
  const symptomIconHeight = symptomsSectionHeight / symptomsToDisplay.length

  return (
    <View>
      {shouldShowTemperatureColumn && <TickList height={height} />}
      <ChartLegend height={xAxisHeight} />
      <View style={[styles.yAxis, { height: symptomsSectionHeight }]}>
        {symptomsToDisplay.map((symptom) => (
          <SymptomIcon
            key={symptom}
            symptom={symptom}
            height={symptomIconHeight}
          />
        ))}
      </View>
    </View>
  )
}

YAxis.propTypes = {
  height: PropTypes.number,
  symptomsToDisplay: PropTypes.array,
  symptomsSectionHeight: PropTypes.number,
  shouldShowTemperatureColumn: PropTypes.bool,
  xAxisHeight: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  yAxis: {
    width: CHART_YAXIS_WIDTH,
  },
})

export default YAxis
