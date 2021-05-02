import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'

import { Sizes } from '../../styles'
import { CHART_TICK_WIDTH } from '../../config'

const Tick = ({ yPosition, height, isBold, shouldShowLabel, label }) => {
  const top = yPosition - height / 2
  const containerStyle = [ styles.container, { flexBasis: height, height, top }]
  const textStyle = isBold ? styles.textBold : styles.textNormal

  return(
    <View style={containerStyle}>
      <AppText style={textStyle}>{shouldShowLabel && label}</AppText>
    </View>
  )
}

Tick.propTypes = {
  yPosition: PropTypes.number,
  height: PropTypes.number.isRequired,
  isBold: PropTypes.bool,
  shouldShowLabel: PropTypes.bool,
  label: PropTypes.string,
}


const text = {
  textAlign: 'right',
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: CHART_TICK_WIDTH
  },
  textBold: {
    fontSize: Sizes.base,
    fontWeight: 'bold',
    ...text
  },
  textNormal: {
    fontSize: Sizes.small,
    ...text
  }
})

export default Tick
