import React, { Component } from 'react'

import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import Segment from '../../common/segment'

import CreatePassword from './create'
import ChangePassword from './update'
import DeletePassword from './delete'

import { hasEncryptionObservable } from '../../../local-storage'
import labels from '../../../i18n/en/settings'

export default class PasswordSetting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPasswordSet: hasEncryptionObservable.value,
      isChangingPassword: false,
      isDeletingPassword: false
    }
  }

  onChangingPassword = () => {
    this.setState({ isChangingPassword: true })
  }

  onCancelChangingPassword = () => {
    this.setState({ isChangingPassword: false })
  }

  onDeletingPassword = () => {
    this.setState({ isDeletingPassword: true })
  }

  onCancelDeletingPassword = () => {
    this.setState({ isDeletingPassword: false })
  }

  render() {

    const {
      isPasswordSet,
      isChangingPassword,
      isDeletingPassword,
    } = this.state

    const {
      title,
      explainerEnabled,
      explainerDisabled
    } = labels.passwordSettings

    return (
      <AppPage>
        <Segment title={title} last>
          <AppText>
            {isPasswordSet ? explainerEnabled : explainerDisabled}
          </AppText>

          {!isPasswordSet && <CreatePassword/>}

          {(isPasswordSet && !isDeletingPassword) && (
            <ChangePassword
              onStartChange = {this.onChangingPassword}
              onCancelChange = {this.onCancelChangingPassword}
            />
          )}

          {(isPasswordSet && !isChangingPassword) && (
            <DeletePassword
              onStartDelete = {this.onDeletingPassword}
              onCancelDelete = {this.onCancelDeletingPassword}
            />
          )}
        </Segment>
      </AppPage>
    )
  }
}
