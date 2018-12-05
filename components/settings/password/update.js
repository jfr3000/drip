
import React, { Component } from 'react'
import {
  View,
  TouchableOpacity} from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import AppText from '../../app-text'
import styles from '../../../styles'
import { shared } from '../../../i18n/en/labels'
import { settings as labels } from '../../../i18n/en/settings'
import { requestHash, changeEncryptionAndRestartApp } from '../../../db'
import PasswordField from './password-field'
import SettingsButton from './settings-button'
import showBackUpReminder from './show-backup-reminder'
import checkCurrentPassword from './check-current-password'


export default class ChangePassword extends Component {
  constructor() {
    super()
    this.state = {
      enteringCurrentPassword: false,
      currentPassword: null,
      enteringNewPassword: false,
      newPassword: null
    }

    nodejs.channel.addListener(
      'pre-change-pw-check',
      this.openNewPasswordField,
      this
    )

    nodejs.channel.addListener(
      'change-pw',
      changeEncryptionAndRestartApp,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('pre-change-pw-check', this.openNewPasswordField)
    nodejs.channel.removeListener('change-pw', changeEncryptionAndRestartApp)
  }

  openNewPasswordField = async hash => {
    const passwordCorrect = await checkCurrentPassword({
      hash,
      onTryAgain: () => this.setState({ currentPassword: null }),
      onCancel: () => this.setState({
        enteringCurrentPassword: false,
        currentPassword: null
      })
    })

    if (passwordCorrect) {
      this.setState({
        enteringCurrentPassword: false,
        currentPassword: null,
        enteringNewPassword: true
      })
    }
  }

  startChangingPassword = () => {
    showBackUpReminder(() => {
      this.setState({ enteringCurrentPassword: true })
    })
  }

  render() {
    return (
      <View>
        {!this.state.enteringCurrentPassword &&
         !this.state.enteringNewPassword &&
         <SettingsButton
           onPress={this.startChangingPassword}
           disabled={this.state.currentPassword}
         >
           {labels.passwordSettings.changePassword}
         </SettingsButton>
        }

        {this.state.enteringCurrentPassword &&
          <View>
            <PasswordField
              onChangeText={val => {
                this.setState({
                  currentPassword: val,
                  wrongPassword: false
                })
              }}
              value={this.state.currentPassword}
              placeholder={labels.passwordSettings.enterCurrent}
            />
            <SettingsButton
              onPress={() => requestHash('pre-change-pw-check', this.state.currentPassword)}
              disabled={!this.state.currentPassword}
            >
              {shared.unlock}
            </SettingsButton>
          </View>
        }

        {this.state.enteringNewPassword &&
        <View>
          <PasswordField
            style={styles.passwordField}
            onChangeText={val => {
              this.setState({
                newPassword: val
              })
            }}
            value={this.state.changedPassword}
            placeholder={labels.passwordSettings.enterNew}
          />
          <SettingsButton
            onPress={() => requestHash('change-pw', this.state.newPassword)}
            disabled={ !this.state.newPassword }
          >
            {labels.passwordSettings.changePassword}
          </SettingsButton>
        </View>
        }

      </View>
    )
  }
}