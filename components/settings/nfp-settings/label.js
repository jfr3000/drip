import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'

import AppText from '../../common/app-text'

import { Sizes } from '../../../styles/redesign'

const sliderRadius = 5
const width = 50

export default class Label extends React.Component {
  static propTypes = {
    oneMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    twoMarkerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    oneMarkerLeftPosition: PropTypes.number,
    twoMarkerLeftPosition: PropTypes.number,
  }


  render() {
    const {
      oneMarkerValue,
      twoMarkerValue,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
    } = this.props

    const minCoordinate = oneMarkerLeftPosition - width / 2 + sliderRadius
    const maxCoordinate = twoMarkerLeftPosition - width / 2 + sliderRadius
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
}

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    marginTop: (-1) * Sizes.base
  }
})