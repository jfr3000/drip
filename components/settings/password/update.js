import React, { Component } from 'react'
import { View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import { settings } from '../../../i18n/en/settings'
import { requestHash } from '../../../db'
import EnterNewPassword from './enter-new-password'
import PasswordField from './password-field'
import SettingsButton from './settings-button'
import showBackUpReminder from './show-backup-reminder'
import checkCurrentPassword from './check-current-password'


export default class ChangePassword extends Component {
  constructor() {
    super()
    this.state = {
      currentPassword: null,
      enteringCurrentPassword: false,
      enteringNewPassword: false
    }

    nodejs.channel.addListener(
      'pre-change-pw-check',
      this.openNewPasswordField,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('pre-change-pw-check', this.openNewPasswordField)
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

  render() {

    const {
      enteringCurrentPassword,
      enteringNewPassword,
      currentPassword
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
      return <EnterNewPassword />
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