import React from 'react'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'

import styles from './styles'

const Tick = ({ yPosition, isBold, shouldShowLabel, label }) => {
  // this eyeballing is sadly necessary because RN does not
  // support percentage values for transforms, which we'd need
  // to reliably place the label vertically centered to the grid
  const topPosition = yPosition - 8
  const style = [
    styles.yAxisLabels.tempScale,
    {top: topPosition},
    isBold && styles.boldTick
  ]

  return <AppText style={style}>{shouldShowLabel && label}</AppText>
}

Tick.propTypes = {
  yPosition: PropTypes.number,
  isBold: PropTypes.bool,
  shouldShowLabel: PropTypes.bool,
  label: PropTypes.string,
}

export default Tick
