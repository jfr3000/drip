import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import AppText from './app-text'
import styles from '../../styles'

export default function Button({
  backgroundColor,
  children,
  onPress,
  style,
  testID
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, { backgroundColor }]}
      testID={testID}
    >
      <AppText style={styles.homeButtonText}>{children}</AppText>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.object,
  testID: PropTypes.string
}
