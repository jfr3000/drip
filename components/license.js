import React from 'react'
import PropTypes from 'prop-types'
import { BackHandler, StyleSheet, View } from 'react-native'

import AppPage from './common/app-page'
import AppText from './common/app-text'
import Button from './common/button'
import Segment from './common/segment'

import { saveLicenseFlag } from '../local-storage'

import { shared } from '../i18n/en/labels'
import settingsLabels from '../i18n/en/settings'
import { Containers } from '../styles/redesign'

const labels = settingsLabels.license

export default function License({ setLicense }) {
  const onAcceptLicense = async () => {
    await saveLicenseFlag()
    setLicense()
  }

  return (
    <AppPage testID='licensePage'>
      <Segment last testID='test' title={labels.title}>
        <AppText testID='test'>{labels.text}</AppText>
        <View style={styles.container}>
          <Button onPress={BackHandler.exitApp} testID='licenseCancelButton'>
            {shared.cancel}
          </Button>
          <Button isCTA onPress={onAcceptLicense} testID='licenseOkButton'>
            {shared.ok}
          </Button>
        </View>
      </Segment>
    </AppPage>
  )
}

License.propTypes = {
  setLicense: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer
  }
})
