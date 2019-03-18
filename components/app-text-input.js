import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'
import styles from '../styles'

export default function AppTextInput({ style, ...props }) {
  return (
    <TextInput
      style={[styles.textInputField, ...style]}
      autoFocus={props.autoFocus}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      {...props}
    />
  )
}

AppTextInput.propTypes = {
  secureTextEntry: PropTypes.bool
}

AppTextInput.defaultProps = {
  style: []
}
