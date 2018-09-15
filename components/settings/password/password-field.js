import React from 'react'
import { TextInput } from 'react-native'
import styles from '../../../styles'

export default function PasswordField(props) {
  return (
    <TextInput
      style={styles.passwordField}
      autoFocus={true}
      secureTextEntry={true}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
    />
  )
}
