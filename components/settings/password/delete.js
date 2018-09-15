import React, { Component } from 'react'
import {
  View,
  TouchableOpacity
} from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { AppText } from '../../app-text'
import styles from '../../../styles'
import { settings as labels } from '../../labels'
import { requestHash, changeEncryptionAndRestartApp } from '../../../db'
import PasswordField from './password-field'
import showBackUpReminder from './show-backup-reminder'
import checkCurrentPassword from './check-current-password'

export default class DeletePassword extends Component {
  constructor() {
    super()
    this.state = {
      enteringCurrentPassword: false,
      currentPassword: null
    }

    nodejs.channel.addListener(
      'pre-delete-pw-check',
      this.removeEncryption,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('pre-delete-pw-check', this.removeEncryption)
  }

  removeEncryption = async hash => {
    const passwordIsCorrect = await checkCurrentPassword({
      hash,
      onTryAgain: () => this.setState({currentPassword: null}),
      onCancel: () => this.setState({
        enteringCurrentPassword: false,
        currentPassword: null
      })
    })

    if (passwordIsCorrect) await changeEncryptionAndRestartApp()
  }

  render() {
    return (
      <View>
        {this.state.enteringCurrentPassword &&
          <PasswordField
            onChangeText={val => this.setState({ currentPassword: val })}
            value={this.state.currentPassword}
            placeholder={labels.passwordSettings.enterCurrent}
          />
        }
        <TouchableOpacity
          onPress={() => {
            if (!this.state.enteringCurrentPassword) {
              showBackUpReminder(() => {
                this.setState({ enteringCurrentPassword: true })
              })
            } else {
              requestHash('pre-delete-pw-check', this.state.currentPassword)
            }
          }}
          style={styles.settingsButton}
        >
          <AppText style={styles.settingsButtonText}>
            {labels.passwordSettings.deletePassword}
          </AppText>
        </TouchableOpacity>
      </View>
    )
  }
}