import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from '../../common/button'
import ConfirmWithPassword from '../common/confirm-with-password'

import labels from '../../../i18n/en/settings'

export default class DeletePassword extends Component {
  static propTypes = {
    onStartDelete: PropTypes.func,
    onCancelDelete: PropTypes.func,
  }

  constructor() {
    super()

    this.state = { enteringCurrentPassword: false }
  }

  startConfirmWithPassword = () => {
    this.setState({ enteringCurrentPassword: true })
    this.props.onStartDelete()
  }

  cancelConfirmationWithPassword = () => {
    this.setState({ enteringCurrentPassword: false })
    this.props.onCancelDelete()
  }

  render() {
    const { enteringCurrentPassword } = this.state

    if (enteringCurrentPassword) {
      return (
        <ConfirmWithPassword
          onSuccess={this.props.changeEncryptionAndRestart}
          onCancel={this.cancelConfirmationWithPassword}
        />
      )
    }

    return (
      <Button isCTA onPress={this.startConfirmWithPassword}>
        {labels.passwordSettings.deletePassword}
      </Button>
    )
  }
}
