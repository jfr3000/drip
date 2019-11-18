import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import Tick from './tick'

import { getTickList } from '../helpers/chart'

import styles from './styles'

const TickList = ({ height }) => {
  return (
    <View style={[styles.yAxis, { height }]}>{
      getTickList(height)
        .map(({ label, position, isBold, shouldShowLabel}) => {
          return (
            <Tick
              key={label}
              yPosition={position}
              isBold={isBold}
              shouldShowLabel={shouldShowLabel}
              label={label}
            />
          )
        })
    }</View>
  )
}

TickList.propTypes = {
  height: PropTypes.number,
}

export default TickList
