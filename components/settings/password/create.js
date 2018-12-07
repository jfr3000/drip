import React, { Component } from 'react'
import { View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import AppText from '../../app-text'
import styles from '../../../styles'
import { settings } from '../../../i18n/en/settings'
import { requestHash, changeEncryptionAndRestartApp } from '../../../db'
import PasswordField from './password-field'
import showBackUpReminder from './show-backup-reminder'
import SettingsButton from './settings-button'



export default class CreatePassword extends Component {
  constructor() {
    super()
    this.state = {
      isSettingPassword: false,
      password: '',
      passwordConfirmation: '',
      shouldShowErrorMessage: false,
    }
    nodejs.channel.addListener(
      'create-pw-hash',
      changeEncryptionAndRestartApp,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('create-pw-hash', changeEncryptionAndRestartApp)
  }

  savePassword = () => {
    if (this.comparePasswords()) {
      requestHash('create-pw-hash', this.state.password)
    } else {
      this.setState({
        shouldShowErrorMessage: true
      })
    }
  }

  toggleSettingPassword = () => {
    const { isSettingPassword } = this.state
    this.setState({ isSettingPassword: !isSettingPassword })
  }

  startSettingPassword = () => {
    showBackUpReminder(this.toggleSettingPassword)
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
      isSettingPassword,
      password,
      passwordConfirmation,
      shouldShowErrorMessage,
    } = this.state
    const labels = settings.passwordSettings

    const isSaveButtonDisabled =
      !password.length ||
      !passwordConfirmation.length

    if (!isSettingPassword) {
      return (
        <View>
          <SettingsButton onPress={this.startSettingPassword}>
            {labels.setPassword}
          </SettingsButton>
        </View>
      )
    } else {
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
}