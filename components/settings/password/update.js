import React, { Component } from 'react'
import { View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import { settings } from '../../../i18n/en/settings'
import { requestHash, changeEncryptionAndRestartApp } from '../../../db'
import PasswordField from './password-field'
import SettingsButton from './settings-button'
import showBackUpReminder from './show-backup-reminder'
import checkCurrentPassword from './check-current-password'


export default class ChangePassword extends Component {
  constructor() {
    super()
    this.state = {
      currentPassword: null,
      newPassword: null,
      newPasswordConfirmation: null,
      enteringCurrentPassword: false,
      enteringNewPassword: false
    }

    nodejs.channel.addListener(
      'pre-change-pw-check',
      this.openNewPasswordField,
      this
    )

    nodejs.channel.addListener(
      'change-pw',
      changeEncryptionAndRestartApp,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('pre-change-pw-check', this.openNewPasswordField)
    nodejs.channel.removeListener('change-pw', changeEncryptionAndRestartApp)
  }

  openNewPasswordField = async hash => {
    const passwordCorrect = await checkCurrentPassword({
      hash,
      onTryAgain: () => this.setState({ currentPassword: null }),
      onCancel: () => this.setState({
        enteringCurrentPassword: false,
        currentPassword: null
      })
    })

    if (passwordCorrect) {
      this.setState({
        currentPassword: null,
        enteringNewPassword: true,
        enteringCurrentPassword: false
      })
    }
  }

  startChangingPassword = () => {
    showBackUpReminder(() => {
      this.setState({ enteringCurrentPassword: true })
    })
  }

  handleCurrentPasswordInput = (currentPassword) => {
    this.setState({ currentPassword })
  }

  checkCurrentPassword = () => {
    requestHash('pre-change-pw-check', this.state.currentPassword)
  }

  handleNewPasswordInput = (newPassword) => {
    this.setState({ newPassword })
  }

  changePassword = () => {
    requestHash('change-pw', this.state.newPassword)
  }

  render() {

    const {
      enteringCurrentPassword,
      enteringNewPassword,
      currentPassword,
      newPassword
    } = this.state

    const labels = settings.passwordSettings

    if (enteringCurrentPassword) {
      return (
        <View>
          <PasswordField
            placeholder={labels.enterCurrent}
            value={currentPassword}
            onChangeText={this.handleCurrentPasswordInput}
          />
          <SettingsButton
            onPress={this.checkCurrentPassword}
            disabled={!currentPassword}
          >
            {sharedLabels.unlock}
          </SettingsButton>
        </View>
      )
    }

    if (enteringNewPassword) {
      return (
        <View>
          <PasswordField
            placeholder={labels.enterNew}
            value={newPassword}
            onChangeText={this.handleNewPasswordInput}
          />
          <SettingsButton
            onPress={this.changePassword}
            disabled={!newPassword}
          >
            {labels.changePassword}
          </SettingsButton>
        </View>
      )
    }

    return (
      <View>
        <SettingsButton
          onPress={this.startChangingPassword}
          disabled={currentPassword}
        >
          {labels.changePassword}
        </SettingsButton>
      </View>
    )
  }
}