import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import config from '../../config'
import { scaleObservable, unitObservable } from '../../local-storage'

import SymptomIcon from './symptom-icon'
import TickList from './tick-list'
import ChartLegend from './chart-legend'

import styles from './styles'

export function getTickList(columnHeight) {

  const units = unitObservable.value
  const scaleMax = scaleObservable.value.max

  return getTickPositions(columnHeight).map((tickPosition, i) => {

    const tick = scaleMax - i * units
    let isBold, label, shouldShowLabel

    if (Number.isInteger(tick)) {
      isBold = true
      label = tick.toString() + '.0'
    } else {
      isBold = false
      label = tick.toString()
    }

    // when temp range <= 3, units === 0.1 we show temp values with step 0.2
    // when temp range > 3, units === 0.5 we show temp values with step 0.5

    if (units === 0.1) {
      // show label with step 0.2
      shouldShowLabel = !(tick * 10 % 2)
    } else {
      // show label with step 0.5
      shouldShowLabel = !(tick * 10 % 5)
    }

    return {
      position: tickPosition,
      label,
      isBold,
      shouldShowLabel,
    }
  })
}

export function makeHorizontalGrid(columnHeight, symptomRowHeight) {
  return getTickPositions(columnHeight).map(tick => {
    return (
      <View
        top={tick + symptomRowHeight}
        {...styles.horizontalGrid}
        key={tick}
      />
    )
  })
}

function getTickPositions(columnHeight) {
  const units = unitObservable.value
  const scaleMin = scaleObservable.value.min
  const scaleMax = scaleObservable.value.max
  const numberOfTicks = (scaleMax - scaleMin) * (1 / units) + 1
  const tickDistance = 1 / (numberOfTicks - 1)
  const tickPositions = []
  for (let i = 0; i < numberOfTicks; i++) {
    const position = getAbsoluteValue(tickDistance * i, columnHeight)
    tickPositions.push(position)
  }
  return tickPositions
}

export function normalizeToScale(temp, columnHeight) {
  const scale = scaleObservable.value
  const valueRelativeToScale = (scale.max - temp) / (scale.max - scale.min)
  return getAbsoluteValue(valueRelativeToScale, columnHeight)
}

function getAbsoluteValue(relative, columnHeight) {
  // we add some height to have some breathing room
  const verticalPadding = columnHeight * config.temperatureScale.verticalPadding
  const scaleHeight = columnHeight - 2 * verticalPadding
  return scaleHeight * relative + verticalPadding
}

const YAxis = ({ height, symptomsToDisplay, symptomsSectionHeight }) => {
  const symptomIconHeight = symptomsSectionHeight / symptomsToDisplay.length
  return (
    <View>
      <View style={[styles.yAxis, {height: symptomsSectionHeight}]}>
        {symptomsToDisplay.map(symptom => {
          return (
            <SymptomIcon
              key={symptom}
              symptom={symptom}
              height={symptomIconHeight}
            />
          )
        })}
      </View>
      <TickList height={height} />
      <ChartLegend />
    </View>
  )
}

YAxis.propTypes = {
  height: PropTypes.number,
  symptomsToDisplay: PropTypes.array,
  symptomsSectionHeight: PropTypes.number,
}

export default YAxis
