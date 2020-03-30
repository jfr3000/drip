import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AppText from './app-text'

import { Colors, Fonts, Spacing } from '../../styles/redesign'

const Button = ({ children, isCTA, isSmall, onPress, testID }) => {
  const buttonStyle = isCTA ? styles.cta : styles.regular
  const textCTA = isCTA ? styles.buttonTextBold : styles.buttonTextRegular
  const textStyle = [ textCTA, isSmall ? textSmall : text]

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} testID={testID}>
      <AppText style={textStyle}>{children}</AppText>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  isCTA: PropTypes.bool,
  isSmall: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string
}

const text = {
  padding: Spacing.base,
  textTransform: 'uppercase'
}

const textSmall = {
  fontSize: Fonts.small,
  padding: Spacing.small,
  textTransform: 'uppercase'
}

const button = {
  alignItems: 'center',
  justifyContent: 'center',
  margin: Spacing.base
}

const styles = StyleSheet.create({
  regular: {
    ...button
  },
  cta: {
    backgroundColor: Colors.orange,
    borderRadius: 25,
    ...button
  },
  buttonTextBold: {
    color: 'white',
    fontFamily: Fonts.bold
  },
  buttonTextRegular: {
    color: Colors.greyDark,
    fontFamily: Fonts.main
  }
})

export default Button
