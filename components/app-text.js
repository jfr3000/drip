import React from 'react'
import { Text } from 'react-native'
import styles from "../styles"
import Link from './link'

export default function AppText(props) {
  // we parse for links in case the text contains any
  return (
    <Link>
      <Text
        style={[styles.appText, props.style]}
        onPress={props.onPress}
        numberOfLines={props.numberOfLines}
      >
        {props.children}
      </Text>
    </Link>
  )
}

export function ActionHint(props) {
  if(props.isVisible) {
    return (
      <AppText
        style={[styles.actionHint, props.style]}>
        {props.children}
      </AppText>
    )
  } else {
    return null
  }
}

export function SymptomSectionHeader(props) {
  return (
    <AppText style={styles.symptomViewHeading}>
      {props.children}
    </AppText>
  )
}