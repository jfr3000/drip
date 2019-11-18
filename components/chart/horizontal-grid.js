import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { getTickPositions } from '../helpers/chart'

import styles from './styles'

const HorizontalGrid = ({ height, startPosition }) => {
  return getTickPositions(height).map(tick => {
    return (
      <View
        top={startPosition + tick}
        {...styles.horizontalGrid}
        key={tick}
      />
    )
  })
}

HorizontalGrid.propTypes = {
  height: PropTypes.number,
  startPosition: PropTypes.number,
}

export default HorizontalGrid
