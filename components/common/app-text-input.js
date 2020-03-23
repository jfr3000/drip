import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'

import { Containers } from '../../styles/redesign'

const AppTextInput = ({
  autoFocus,
  onChangeText,
  placeholder,
  value,
  style,
  ...props
}) => {
  if (!Array.isArray(style)) style = [style]

  return (
    <TextInput
      autoFocus={autoFocus}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.input, ...style]}
      value={value}
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

const styles = StyleSheet.create({
  input: {
    ...Containers.greyBorder
  }
})

export default AppTextInput
