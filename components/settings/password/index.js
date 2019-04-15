import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import CreatePassword from './create'
import ChangePassword from './update'
import DeletePassword from './delete'
import FramedSegment from '../../framed-segment'
import AppText from '../../app-text'
import {
  hasEncryptionObservable
} from '../../../local-storage'
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
      <ScrollView>
        <FramedSegment title={title}>
          <AppText>
            { isPasswordSet ? explainerEnabled : explainerDisabled }
          </AppText>

          { !isPasswordSet && <CreatePassword/> }

          { (isPasswordSet && !isDeletingPassword) && (
            <ChangePassword
              onStartChange = {this.onChangingPassword}
              onCancelChange = {this.onCancelChangingPassword}
            />
          )}

          { (isPasswordSet && !isChangingPassword) && (
            <DeletePassword
              onStartDelete = {this.onDeletingPassword}
              onCancelDelete = {this.onCancelDeletingPassword}
            />
          )}
        </FramedSegment>
      </ScrollView>
    )
  }
}
