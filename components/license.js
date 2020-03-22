import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, BackHandler } from 'react-native'
import AppText from './common/app-text'
import { shared } from '../i18n/en/labels'
import settingsLabels from '../i18n/en/settings'
import styles,{secondaryColor} from '../styles'
import Button from './common/button'
import { saveLicenseFlag } from '../local-storage'

const labels = settingsLabels.license
export default function License({setLicense}) {
  return (
    <ScrollView testID='licensePage' style={styles.licensePage}>
      <AppText style={styles.framedSegmentTitle}>{labels.title}</AppText>
      <AppText testID='test'>{labels.text}</AppText>
      <View style={styles.licenseButtons}>
        <Button
          style={styles.licenseButton}
          backgroundColor={'grey'}
          onPress={() => BackHandler.exitApp()}
          testID='licenseCancelButton'
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
          testID='licenseOkButton'
        >
          {shared.ok}
        </Button>
      </View>
    </ScrollView>
  )
}

License.propTypes = {
  setLicense: PropTypes.func.isRequired
}
