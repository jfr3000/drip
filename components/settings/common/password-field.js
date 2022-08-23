import React from 'react'
import PropTypes from 'prop-types'
import AppTextInput from '../../common/app-text-input'

import styles from '../../../styles'

export default function PasswordField(props) {
  return (
    <AppTextInput style={styles.passwordField} secureTextEntry {...props} />
  )
}

PasswordField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  autoFocus: PropTypes.bool,
}
