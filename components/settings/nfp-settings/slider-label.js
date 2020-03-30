import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

import AppText from '../../common/app-text'

import { Fonts, Sizes } from '../../../styles/redesign'

const sliderRadius = 5
const width = 50

const getMarkerCoordinate = (position) => {
  return position - width / 2 + sliderRadius
}

const SliderLabel = ({
  oneMarkerValue,
  twoMarkerValue,
  oneMarkerLeftPosition,
  twoMarkerLeftPosition
}) => {
  const minCoordinate = getMarkerCoordinate(oneMarkerLeftPosition)
  const maxCoordinate = getMarkerCoordinate(twoMarkerLeftPosition)
  const isMinNumber = Number.isFinite(oneMarkerLeftPosition) &&
    Number.isFinite(oneMarkerValue)
  const isMaxNumber = Number.isFinite(twoMarkerLeftPosition) &&
    Number.isFinite(twoMarkerValue)
  const minStyle = [styles.label, { left: minCoordinate }]
  const maxStyle = [styles.label, { left: maxCoordinate }]

  return (
    <React.Fragment>
      {isMinNumber && <AppText style={minStyle}>{oneMarkerValue}</AppText>}
      {isMaxNumber && <AppText style={maxStyle}>{twoMarkerValue}</AppText>}
    </React.Fragment>
  )
}

SliderLabel.propTypes = {
  oneMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  twoMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  oneMarkerLeftPosition: PropTypes.number,
  twoMarkerLeftPosition: PropTypes.number
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.bold,
    position: 'absolute',
    marginTop: (-1) * Sizes.base
  }
})

export default SliderLabel