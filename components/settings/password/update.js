import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../common/button'

import EnterNewPassword from './enter-new-password'
import showBackUpReminder from './show-backup-reminder'
import ConfirmWithPassword from '../common/confirm-with-password'

import settings from '../../../i18n/en/settings'

export default class ChangePassword extends Component {
  static propTypes = {
    onStartChange: PropTypes.func,
    onCancelChange: PropTypes.func
  }

  constructor() {
    super()

    this.state = {
      currentPassword: null,
      enteringCurrentPassword: false,
      enteringNewPassword: false
    }
  }

  startChangingPassword = () => {
    showBackUpReminder(
      this.startEnteringCurrentPassword,
      this.cancelConfirmationWithPassword
    )
  }

  startEnteringCurrentPassword = () => {
    this.setState({ enteringCurrentPassword: true })
    this.props.onStartChange()
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
    this.props.onCancelChange()
  }

  render() {
    const {
      enteringCurrentPassword,
      enteringNewPassword,
      currentPassword
    } = this.state
    const labels = settings.passwordSettings
    const isPasswordSet = currentPassword !== null

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
      <Button
        disabled={isPasswordSet}
        isCTA
        onPress={this.startChangingPassword}
      >
        {labels.changePassword}
      </Button>
    )
  }
}