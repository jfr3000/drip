import React, { Component } from 'react'
import { View } from 'react-native'
import settings from '../../../i18n/en/settings'
import EnterNewPassword from './enter-new-password'
import SettingsButton from '../shared/settings-button'
import showBackUpReminder from './show-backup-reminder'

export default class CreatePassword extends Component {
  constructor() {
    super()
    this.state = {
      isSettingPassword: false
    }
  }

  toggleSettingPassword = () => {
    const { isSettingPassword } = this.state
    this.setState({ isSettingPassword: !isSettingPassword })
  }

  startSettingPassword = () => {
    showBackUpReminder(this.toggleSettingPassword)
  }

  render () {
    const {
      isSettingPassword
    } = this.state
    const labels = settings.passwordSettings

    if (!isSettingPassword) {
      return (
        <View>
          <SettingsButton onPress={this.startSettingPassword}>
            {labels.setPassword}
          </SettingsButton>
        </View>
      )
    } else {
      return <EnterNewPassword />
    }

  }
}