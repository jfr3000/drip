import React from 'react'
import PropTypes from 'prop-types'

import { Shape } from 'react-native/Libraries/ART/ReactNativeART'

import styles from './styles'

const ChartLine = ({ path, isNfpLine = false }) => {
  const strokeStyle =
    isNfpLine ? styles.nfpLine.stroke : styles.column.stroke.color
  const strokeWidth =
    isNfpLine ? styles.nfpLine.strokeWidth : styles.column.stroke.width

  return (
    <Shape
      stroke={strokeStyle}
      strokeWidth={strokeWidth}
      d={path}
    />
  )
}

ChartLine.propTypes = {
  path: PropTypes.object,
  isNfpLine: PropTypes.bool,
}

export default ChartLine
