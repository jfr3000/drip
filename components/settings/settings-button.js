import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import AppText from '../app-text'
import styles from '../../styles'

const SettingsButton = ({ children, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.settingsButton,
        props.disabled ? styles.settingsButtonDisabled : null
      ]}
      { ...props }
    >
      <AppText style={styles.settingsButtonText}>
        {children}
      </AppText>
    </TouchableOpacity>
  )
}

SettingsButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default SettingsButton