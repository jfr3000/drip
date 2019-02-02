import React from 'react'
import PropTypes from 'prop-types'

import { TouchableOpacity } from 'react-native'
import AppText from '../../app-text'
import styles from '../../../styles'

const SettingsButton = ({ children, style, secondary, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.settingsButton,
        secondary ? null : styles.settingsButtonAccent,
        props.disabled ? styles.settingsButtonDisabled : null,
        style
      ]}
      { ...props }
    >
      <AppText style={
        secondary ?
          styles.settingsButtonSecondaryText :
          styles.settingsButtonText
      }>
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