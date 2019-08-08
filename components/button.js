import React from 'react'
import { TouchableOpacity } from 'react-native'
import AppText from './app-text'
import styles from '../styles'

export default function Button(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.button,
        props.style,
        {backgroundColor: props.backgroundColor}
      ]}
      testID={props.testID}
    >
      <AppText style={styles.homeButtonText}>
        {props.children}
      </AppText>
    </TouchableOpacity>
  )
}