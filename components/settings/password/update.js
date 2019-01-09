import React, { Component } from 'react'
import settings from '../../../i18n/en/settings'
import EnterNewPassword from './enter-new-password'
import SettingsButton from '../shared/settings-button'
import showBackUpReminder from './show-backup-reminder'
import ConfirmWithPassword from '../shared/confirm-with-password'


export default class ChangePassword extends Component {
  constructor() {
    super()
    this.state = {
      currentPassword: null,
      enteringCurrentPassword: false,
      enteringNewPassword: false
    }
  }

  startChangingPassword = () => {
    showBackUpReminder(() => {
      this.setState({ enteringCurrentPassword: true })
    })
    this.props.onStartChangingPassword()
  }

  startEnteringNewPassword = () => {
    this.setState({
      currentPassword: null,
      enteringNewPassword: true,
      enteringCurrentPassword: false
    })
  }

  cancelConfirmationWithPassword = () => {
    this.setState({
      currentPassword: null,
      enteringNewPassword: false,
      enteringCurrentPassword: false
    })
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
        <ConfirmWithPassword
          onSuccess={this.startEnteringNewPassword}
          onCancel={this.cancelConfirmationWithPassword}
        />
      )
    }

    if (enteringNewPassword) {
      return <EnterNewPassword />
    }

    return (
      <SettingsButton
        onPress={this.startChangingPassword}
        disabled={currentPassword}
      >
        {labels.changePassword}
      </SettingsButton>
    )
  }
}