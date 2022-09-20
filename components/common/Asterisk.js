import React from 'react'
import { StyleSheet } from 'react-native'

import AppText from './app-text'

import { Colors } from '../../styles'

const Asterisk = () => <AppText style={styles.asterisk}>*</AppText>

const styles = StyleSheet.create({
  asterisk: {
    color: Colors.orange,
  },
})

export default Asterisk
