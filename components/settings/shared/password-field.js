import React from 'react'
import { TextInput } from 'react-native'
import styles, {secondaryColor} from '../../../styles'

export default function PasswordField(props) {
  return (
    <TextInput
      style={styles.passwordField}
      autoFocus={props.autoFocus === false ? false : true}
      secureTextEntry={true}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholder}
      borderWidth={1}
      borderColor={secondaryColor}
      borderStyle={'solid'}
    />
  )
}
