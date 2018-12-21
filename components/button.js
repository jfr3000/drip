import React from 'react'
import { View } from 'react-native'
import AppText from './app-text'
import styles from '../styles'

export default function Button({ backgroundColor, style, children }) {
  return (
    <View style={[
      styles.button,
      style,
      {backgroundColor}
    ]}>
      <AppText style={styles.homeButtonText}>
        {children}
      </AppText>
    </View>
  )
}