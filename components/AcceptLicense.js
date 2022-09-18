import React from 'react'
import PropTypes from 'prop-types'
import { BackHandler, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import License from './settings/License'
import Button from './common/button'

import { saveLicenseFlag } from '../local-storage'

import { Containers } from '../styles'

export default function AcceptLicense({ setLicense }) {
  const onAcceptLicense = async () => {
    await saveLicenseFlag()
    setLicense()
  }

  const { t } = useTranslation()

  return (
    <License>
      <View style={styles.container}>
        <Button onPress={BackHandler.exitApp} testID="licenseCancelButton">
          {t('labels.shared.cancel')}
        </Button>
        <Button isCTA onPress={onAcceptLicense} testID="licenseOkButton">
          {t('labels.shared.ok')}
        </Button>
      </View>
    </License>
  )
}

AcceptLicense.propTypes = {
  setLicense: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
  },
})
