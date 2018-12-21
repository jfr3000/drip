import React from 'react'
import { ScrollView, View } from 'react-native'
import AppText from './app-text'
import { licenseText, shared } from '../i18n/en/labels'
import styles,{secondaryColor} from '../styles'
import Button from './button'

export default function License() {
  return (
    <ScrollView style={styles.licensePage}>
      <AppText>{licenseText}</AppText>
      <View style={styles.licenseButtons}>
        <Button style={styles.licenseButton} backgroundColor={'grey'}>
          {shared.cancel}
        </Button>
        <Button style={styles.licenseButton} backgroundColor={secondaryColor}>
          {shared.ok}
        </Button>
      </View>
    </ScrollView>
  )
}