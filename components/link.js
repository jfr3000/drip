import React from 'react'
import { Linking } from 'react-native'
import AppText from "./app-text"
import styles from '../styles';

export default function Link(props) {
  return (
    <AppText
      style={styles.link}
      onPress={() => Linking.openURL(props.href)}
    >{props.text}</AppText>
  )
}