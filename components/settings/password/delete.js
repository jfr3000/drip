import React, { Component } from 'react'
import labels from '../../../i18n/en/settings'
import { changeEncryptionAndRestartApp } from '../../../db'
import ConfirmWithPassword from '../shared/confirm-with-password'
import SettingsButton from '../shared/settings-button'

export default class DeletePassword extends Component {
  constructor() {
    super()
    this.state = {
      enteringCurrentPassword: false
    }
  }

  startConfirmWithPassword = () => {
    this.setState({ enteringCurrentPassword: true })
    this.props.onStartDeletingPassword()
  }

  startDeletePassword = async () => {
    await changeEncryptionAndRestartApp()
  }

  cancelConfirmationWithPassword = () => {
    this.setState({ enteringCurrentPassword: false })
  }

  render() {

    const { enteringCurrentPassword } = this.state

    if (enteringCurrentPassword) {
      return (
        <ConfirmWithPassword
          onSuccess={this.startDeletePassword}
          onCancel={this.cancelConfirmationWithPassword}
        />
      )
    }

    return (
      <SettingsButton onPress={this.startConfirmWithPassword} >
        {labels.passwordSettings.deletePassword}
      </SettingsButton>
    )
  }
}