import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AppText from './app-text'

import { Colors, Fonts, Spacing } from '../../styles/redesign'

const Button = ({ children, isCTA, onPress, testID }) => {
  const buttonStyle = isCTA ? styles.orange : {}
  const textStyle = isCTA ? styles.buttonTextBold : styles.buttonTextRegular
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} testID={testID}>
      <AppText style={textStyle}>{children}</AppText>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  isCTA: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string
}

const button = {
  paddingHorizontal: Spacing.large,
  paddingVertical: Spacing.base,
  textTransform: 'uppercase'
}

const styles = StyleSheet.create({
  orange: {
    backgroundColor: Colors.orange,
    borderRadius: 25
  },
  buttonTextBold: {
    fontFamily: Fonts.main,
    ...button
  },
  buttonTextRegular: {
    fontFamily: Fonts.bold,
    ...button
  }
})

export default Button
