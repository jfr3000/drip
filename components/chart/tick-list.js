import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import Tick from './tick'

import { getTickList } from '../helpers/chart'

const TickList = ({ height }) => {

  return (
    <View style={[styles.container, height]}>
      {
        getTickList(height)
          .map(({ isBold, label, position, shouldShowLabel, tickHeight}) => {
            return (
              <Tick
                height={tickHeight}
                isBold={isBold}
                key={label}
                label={label}
                shouldShowLabel={shouldShowLabel}
                yPosition={position}
              />
            )
          })
      }
    </View>
  )
}

TickList.propTypes = {
  height: PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default TickList
