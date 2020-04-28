import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import AppText from '../common/app-text'
import SettingsButton from '../settings/shared/settings-button'

import { shared } from '../../i18n/en/labels'
import styles from './styles'

const NoData = ({ navigate }) => {
  return (
    <View flex={1}>
      <View style={styles.centerItem}>
        <AppText>{shared.noDataWarning}</AppText>
        <SettingsButton
          onPress={() => {navigate('CycleDay')}}
          style={{marginHorizontal: 40}}
        >
          {shared.noDataButtonText}
        </SettingsButton>
      </View>
    </View>
  )
}

NoData.propTypes = {
  navigate: PropTypes.func,
}

export default NoData