import React, { Component } from 'react'
import { View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'

import { requestHash, changeEncryptionAndRestartApp } from '../../../db'
import AppText from '../../app-text'
import PasswordField from './password-field'
import SettingsButton from './settings-button'

import styles from '../../../styles'
import { settings } from '../../../i18n/en/settings'

const LISTENER_TYPE = 'create-or-change-pw'

export default class EnterNewPassword extends Component {

  constructor() {
    super()
    this.state = {
      password: '',
      passwordConfirmation: '',
      shouldShowErrorMessage: false,
    }
    nodejs.channel.addListener(
      LISTENER_TYPE,
      changeEncryptionAndRestartApp,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener(LISTENER_TYPE, changeEncryptionAndRestartApp)
  }

  savePassword = () => {
    if (this.comparePasswords()) {
      requestHash(LISTENER_TYPE, this.state.password)
    } else {
      this.setState({
        shouldShowErrorMessage: true
      })
    }
  }

  comparePasswords = () => {
    return this.state.password === this.state.passwordConfirmation
  }

  handlePasswordInput = (password) => {
    this.setState({ password })
  }

  handleConfirmationInput = (passwordConfirmation) => {
    this.setState({ passwordConfirmation })
  }

  render () {
    const {
      password,
      passwordConfirmation,
      shouldShowErrorMessage,
    } = this.state
    const labels = settings.passwordSettings

    const isSaveButtonDisabled =
      !password.length ||
      !passwordConfirmation.length

    return (
      <View>
        <PasswordField
          placeholder={labels.enterNew}
          value={password}
          onChangeText={this.handlePasswordInput}
        />
        <PasswordField
          autoFocus={false}
          placeholder={labels.confirmPassword}
          value={passwordConfirmation}
          onChangeText={this.handleConfirmationInput}
        />
        {
          shouldShowErrorMessage &&
          <AppText style={styles.errorMessage}>
            {labels.passwordsDontMatch}
          </AppText>
        }
        <SettingsButton
          onPress={this.savePassword}
          disabled={isSaveButtonDisabled}
        >
          {labels.savePassword}
        </SettingsButton>
      </View>
    )
  }
}