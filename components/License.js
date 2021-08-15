import React from 'react'
import PropTypes from 'prop-types'
import { BackHandler, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import AppPage from './common/app-page'
import AppText from './common/app-text'
import Button from './common/button'
import Segment from './common/segment'

import { saveLicenseFlag } from '../local-storage'

import { Containers } from '../styles'

export default function License({ setLicense }) {
  const onAcceptLicense = async () => {
    await saveLicenseFlag()
    setLicense()
  }

  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <AppPage testID="licensePage">
      <Segment last testID="test" title={t("settings.license.title")}>
        <AppText testID="test">{t("settings.license.text", { currentYear })}</AppText>
        <View style={styles.container}>
          <Button onPress={BackHandler.exitApp} testID="licenseCancelButton">
            {t("labels.shared.cancel")}
          </Button>
          <Button isCTA onPress={onAcceptLicense} testID="licenseOkButton">
            {t("labels.shared.ok")}
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
