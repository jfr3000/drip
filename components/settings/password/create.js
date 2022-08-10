import React, { Component } from 'react'

import Button from '../../common/button'

import EnterNewPassword from './enter-new-password'
import showBackUpReminder from './show-backup-reminder'

import settings from '../../../i18n/en/settings'

export default class CreatePassword extends Component {
  constructor() {
    super()

    this.state = { isSettingPassword: false }
  }

  toggleSettingPassword = () => {
    const { isSettingPassword } = this.state
    this.setState({ isSettingPassword: !isSettingPassword })
  }

  startSettingPassword = () => {
    showBackUpReminder(this.toggleSettingPassword, () => {})
  }

  render() {
    const { isSettingPassword } = this.state
    const labels = settings.passwordSettings

    if (!isSettingPassword) {
      return (
        <Button isCTA onPress={this.startSettingPassword}>
          {labels.setPassword}
        </Button>
      )
    } else {
      return (
        <EnterNewPassword
          changeEncryptionAndRestart={this.props.changeEncryptionAndRestart}
        />
      )
    }
  }
}
