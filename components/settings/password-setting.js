import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { AppText } from '../app-text'
import {
  hasEncryptionObservable
} from '../../local-storage'
import styles from '../../styles/index'
import { settings as labels } from '../labels'
import { requestHash, openDb } from '../../db'

export default class PasswordSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enabled: hasEncryptionObservable.value
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
      this.setState({
        wrongPassword: false,
        enterOldPassword: false
      })
    } catch (err) {
      this.setState({wrongPassword: true})
    }
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
        {this.state.enterOldPassword &&
          <TextInput
            style={{
              backgroundColor: 'white',
            }}
            onChangeText={val => this.setState({ oldPassword: val })}
          />
        }
        {this.state.wrongPassword && <AppText>Wrong PAssword!</AppText>}
        <TouchableOpacity
          onPress={() => {
            if (!this.state.enterOldPassword) {
              this.setState({ enterOldPassword: true })
            } else {
              requestHash(this.state.oldPassword)
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