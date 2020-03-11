import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'
import styles from '../styles'

export default function AppTextInput({ style, ...props }) {
  if (!Array.isArray(style)) style = [style]
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
  autoFocus: PropTypes.bool,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  value: PropTypes.string,
}

AppTextInput.defaultProps = {
  style: []
}
