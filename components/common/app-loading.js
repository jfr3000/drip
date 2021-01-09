import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from './app-text'

import { Containers } from '../../styles'

import { shared } from '../../i18n/en/labels'

const AppLoadingView = () => {
  return (
    <View style={styles.container}>
      <AppText>{shared.loading}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Containers.centerItems
  }
})

export default AppLoadingView
