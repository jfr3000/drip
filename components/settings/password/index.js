import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import CreatePassword from './create'
import ChangePassword from './update'
import DeletePassword from './delete'
import SettingsSegment from '../settings-segment'
import AppText from '../../app-text'
import {
  hasEncryptionObservable
} from '../../../local-storage'
import labels from '../../../i18n/en/settings'

export default class PasswordSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUpdateAndDelete: hasEncryptionObservable.value,
      showCreate: !hasEncryptionObservable.value,
      isChangingPassword: false,
      isDeletingPassword: false
    }
  }

  onChangingPassword = () => {
    this.setState({ isChangingPassword: true })
  }

  onDeletingPassword = () => {
    this.setState({ isDeletingPassword: true })
  }

  render() {

    const {
      showUpdateAndDelete,
      isChangingPassword,
      isDeletingPassword,
      showCreate
    } = this.state

    return (
      <ScrollView>
        <SettingsSegment title={labels.passwordSettings.title}>

          {showUpdateAndDelete ?
            <AppText>{labels.passwordSettings.explainerEnabled}</AppText>
            :
            <AppText>{labels.passwordSettings.explainerDisabled}</AppText>
          }

          {
            showUpdateAndDelete && (
              <View>
                {(isChangingPassword
                  || !isChangingPassword && !isDeletingPassword)
                && <ChangePassword
                  onStartChangingPassword = {this.onChangingPassword}
                />}
                {(isDeletingPassword
                  || !isChangingPassword && !isDeletingPassword)
                && <DeletePassword
                  onStartDeletingPassword = {this.onDeletingPassword}
                />}
              </View>
            )
          }

          {showCreate &&
          <CreatePassword/>
          }

        </SettingsSegment>
      </ScrollView>
    )
  }
}