import React from 'react'
import { StyleSheet } from 'react-native'
import AppText from '../common/app-text'

import { shared } from '../../i18n/en/labels'

import { Spacing } from '../../styles'

function NoTemperature() {
  return <AppText style={styles.warning}>{shared.noTemperatureWarning}</AppText>
}

const styles = StyleSheet.create({
  warning: {
    padding: Spacing.large,
  },
})

export default NoTemperature
