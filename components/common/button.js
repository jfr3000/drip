import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AppText from './app-text'

import { Containers, Typography } from '../../styles/redesign'

const Button = ({ children, isOrange, onPress, testID }) => {
  const buttonStyle = isOrange ? styles.orange : {}
  const textStyle = isOrange ? styles.buttonTextBold : styles.buttonTextRegular
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} testID={testID}>
      <AppText style={textStyle}>{children}</AppText>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  isOrange: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string
}

const styles = StyleSheet.create({
  orange: {
    ...Containers.orangeButton
  },
  buttonTextBold: {
    ...Typography.buttonTextBold
  },
  buttonTextRegular: {
    ...Typography.buttonTextRegular
  }
})

export default Button
