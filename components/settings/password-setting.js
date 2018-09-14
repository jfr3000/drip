import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { AppText } from '../app-text'
import {
  hasEncryptionObservable
} from '../../local-storage'
import styles from '../../styles/index'
import { settings as labels, shared } from '../labels'
import { requestHash, changeEncryptionAndRestartApp } from '../../db'

export default class PasswordSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUpdateAndDelete: hasEncryptionObservable.value,
      showSetPassword: !hasEncryptionObservable.value,
      settingNewPassword: false,
      changingPassword: false
    }

    nodejs.channel.addListener(
      'message',
      this.passHashToDb,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('message', this.passHashToDb)
  }

  passHashToDb = async (msg) => {
    msg = JSON.parse(msg)
    if (msg.type != 'sha512') return
    await changeEncryptionAndRestartApp(msg.message)
  }

  render() {
    return (
      <View style={styles.settingsSegment}>
        <AppText style={styles.settingsSegmentTitle}>
          {labels.passwordSettings.title}
        </AppText>
        {this.state.showUpdateAndDelete ?
          <AppText>{labels.passwordSettings.explainerEnabled}</AppText>
          :
          <AppText>{labels.passwordSettings.explainerDisabled}</AppText>
        }

        {this.state.showUpdateAndDelete &&
          <View>
            {this.state.changingPassword &&
              <View>
                <TextInput
                  style={styles.passwordField}
                  autoFocus={true}
                  onChangeText={val => {
                    this.setState({
                      changedPassword: val
                    })
                  }}
                  value={this.state.changedPassword}
                  placeholder={labels.passwordSettings.enterNew}
                  secureTextEntry={true}
                />
              </View>
            }
            <TouchableOpacity
              onPress={() => {
                if (!this.state.changingPassword) {
                  showBackUpReminder(() => {
                    this.setState({ changingPassword: true })
                  })
                } else {
                  requestHash(this.state.changedPassword)
                }
              }}
              disabled={this.state.changingPassword && !this.state.changedPassword}
              style={styles.settingsButton}>
              <AppText style={styles.settingsButtonText}>
                {labels.passwordSettings.changePassword}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                showBackUpReminder(() => changeEncryptionAndRestartApp())
              }}
              style={styles.settingsButton}>
              <AppText style={styles.settingsButtonText}>
                {labels.passwordSettings.deletePassword}
              </AppText>
            </TouchableOpacity>
          </View>
        }

        {this.state.enteringNewPassword &&
          <View>
            <TextInput
              style={styles.passwordField}
              autoFocus={true}
              onChangeText={val => {
                this.setState({
                  newPassword: val
                })
              }}
              value={this.state.newPassword}
              placeholder={labels.passwordSettings.enterNew}
              secureTextEntry={true}
            />
          </View>
        }
        {this.state.showSetPassword &&
          <TouchableOpacity
            onPress={() => {
              if (!this.state.enteringNewPassword) {
                showBackUpReminder(() => {
                  this.setState({ enteringNewPassword: true })
                })
              } else {
                requestHash(this.state.newPassword)
              }
            }}
            disabled={this.state.enteringNewPassword && !this.state.newPassword}
            style={styles.settingsButton}>
            <AppText style={styles.settingsButtonText}>
              {labels.passwordSettings.setPassword}
            </AppText>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

function showBackUpReminder(okHandler) {
  Alert.alert(
    labels.passwordSettings.backupReminderTitle,
    labels.passwordSettings.backupReminder,
    [{
      text: shared.cancel,
      style: 'cancel'
    }, {
      text: shared.ok,
      onPress: okHandler
    }]
  )
}