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
import { requestHash, openDb, changeEncryptionAndRestartApp } from '../../db'

export default class PasswordSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: hasEncryptionObservable.value,
      currentPassword: null,
      enteringCurrentPassword: false
    }

    nodejs.start('main.js')
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
    try {
      await openDb({ hash: msg.message, persistConnection: false })
    } catch (err) {
      Alert.alert(
        shared.incorrectPassword,
        shared.incorrectPasswordMessage,
        [{
          text: shared.cancel,
          onPress: () => {
            this.setState({
              enteringCurrentPassword: false,
              currentPassword: null
            })
          }
        }, {
          text: shared.tryAgain,
          onPress: () => this.setState({currentPassword: null})
        }]
      )
      return
    }
    await changeEncryptionAndRestartApp()
  }

  render() {
    return (
      <View style={styles.settingsSegment}>
        <AppText style={styles.settingsSegmentTitle}>
          {labels.passwordSettings.title}
        </AppText>
        {this.state.enabled ?
          <AppText>{labels.passwordSettings.explainerEnabled}</AppText>
          :
          <AppText>{labels.passwordSettings.explainerDisabled}</AppText>
        }
        {this.state.enteringCurrentPassword &&
          <View>
            <TextInput
              style={styles.passwordField}
              onChangeText={val => {
                this.setState({
                  currentPassword: val,
                  wrongPassword: false
                })
              }}
              value={this.state.currentPassword}
              placeholder={labels.passwordSettings.enterCurrent}
            />
          </View>
        }
        <TouchableOpacity
          onPress={() => {
            if (!this.state.enteringCurrentPassword) {
              Alert.alert(
                labels.passwordSettings.backupReminderTitle,
                labels.passwordSettings.backupReminder,
                [{
                  text: shared.cancel,
                  style: 'cancel'
                }, {
                  text: shared.ok,
                  onPress: () => this.setState({enteringCurrentPassword: true})
                }]
              )
            } else {
              requestHash(this.state.currentPassword)
            }
          }}
          style={styles.settingsButton}>
          <AppText style={styles.settingsButtonText}>
            {labels.passwordSettings.deletePassword}
          </AppText>
        </TouchableOpacity>
      </View>
    )
  }
}