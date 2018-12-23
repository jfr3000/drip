import React from 'react'
import { ScrollView, View, BackHandler } from 'react-native'
import AppText from './app-text'
import { licenseText, shared } from '../i18n/en/labels'
import styles,{secondaryColor} from '../styles'
import Button from './button'
import { saveLicenseFlag } from '../local-storage';

export default function License({setLicense}) {
  return (
    <ScrollView style={styles.licensePage}>
      <AppText>{licenseText}</AppText>
      <View style={styles.licenseButtons}>
        <Button
          style={styles.licenseButton}
          backgroundColor={'grey'}
          onPress={() => BackHandler.exitApp()}
        >
          {shared.cancel}
        </Button>
        <Button
          style={styles.licenseButton}
          backgroundColor={secondaryColor}
          onPress={async () => {
            await saveLicenseFlag()
            setLicense()
          }}
        >
          {shared.ok}
        </Button>
      </View>
    </ScrollView>
  )
}