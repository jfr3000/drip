import React from 'react'
import { ScrollView, View, BackHandler } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import AppText from './app-text'
import { shared } from '../i18n/en/labels'
import settingsLabels from '../i18n/en/settings'
import styles,{secondaryColor} from '../styles'
import Button from './button'
import { saveLicenseFlag } from '../local-storage'
import replace from './helpers/replace-url-with-text'

const labels = settingsLabels.license
export default function License({setLicense}) {
  return (
    <ScrollView style={styles.licensePage}>
      <Hyperlink linkStyle={styles.link} linkText={replace} linkDefault>
        <AppText style={styles.settingsSegmentTitle}>{labels.title}</AppText>
        <AppText>{labels.text}</AppText>
      </Hyperlink>
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