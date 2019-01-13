import React from 'react'
import { Text, View } from 'react-native'
import styles from "../styles"

export default function AppText(props) {
  return (
    <Text
      style={[styles.appText, props.style]}
      onPress={props.onPress}
    >
      {props.children}
    </Text>
  )
}

export function AppTextLight(props) {
  return (
    <Text style={[styles.appTextLight, props.style]}>
      {props.children}
    </Text>
  )
}

export function ActionHint(props) {
  return (
    <View
      style={styles.actionHintWrappingView}>
      <AppText
        style={[styles.actionHint, props.style]}>
        {props.children}
      </AppText>
    </View>
  )
}

export function SymptomSectionHeader(props) {
  return (
    <AppText style={styles.symptomViewHeading}>
      {props.children}
    </AppText>
  )
}