import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'

import { Colors } from '../../styles/redesign'

const AppTextInput = ({
  autoFocus,
  onChangeText,
  placeholder,
  value,
  ...props
}) => {

  return (
    <TextInput
      autoFocus={autoFocus}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.input}
      value={value}
      {...props}
    />
  )
}

AppTextInput.propTypes = {
  autoFocus: PropTypes.bool,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
}

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.grey,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  }
})

export default AppTextInput
