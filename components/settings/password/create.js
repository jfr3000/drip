import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import AppText from '../../app-text'
import styles from '../../../styles'
import { settings as labels } from '../../../copy/en/settings'
import { requestHash, changeEncryptionAndRestartApp } from '../../../db'
import PasswordField from './password-field'
import showBackUpReminder from './show-backup-reminder'

export default class CreatePassword extends Component {
  constructor() {
    super()
    this.state = {
      enteringNewPassword: false,
      newPassword: null
    }
    nodejs.channel.addListener(
      'create-pw-hash',
      changeEncryptionAndRestartApp,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('create-pw-hash', changeEncryptionAndRestartApp)
  }

  render () {
    return (
      <View>
        {this.state.enteringNewPassword &&
          <PasswordField
            placeholder={labels.passwordSettings.enterNew}
            value={this.state.newPassword}
            onChangeText={val => this.setState({newPassword: val})}
          />
        }
        <TouchableOpacity
          onPress={() => {
            if (!this.state.enteringNewPassword) {
              showBackUpReminder(() => {
                this.setState({ enteringNewPassword: true })
              })
            } else {
              requestHash('create-pw-hash', this.state.newPassword)
            }
          }}
          disabled={this.state.enteringNewPassword && !this.state.newPassword}
          style={styles.settingsButton}>
          <AppText style={styles.settingsButtonText}>
            {labels.passwordSettings.setPassword}
          </AppText>
        </TouchableOpacity>
      </View>
    )
  }
}