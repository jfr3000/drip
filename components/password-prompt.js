import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { AppText } from './app-text'
import { hasEncryptionObservable } from '../local-storage'
import styles from '../styles'
import { passwordPrompt, shared } from './labels'
import { requestHash, deleteDbAndOpenNew, openDb } from '../db'

export default class PasswordPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null
    }
    hasEncryptionObservable.once(async hasEncryption => {
      hasEncryption = JSON.parse(hasEncryption)
      if (hasEncryption) {
        this.setState({showPasswordPrompt: true})
      } else {
        await openDb({persistConnection: true})
        this.props.showApp()
      }
    })

    nodejs.channel.addListener(
      'message',
      this.passHashToDb,
      this
    )
  }

  passHashToDb = async msg => {
    msg = JSON.parse(msg)
    if (msg.type != 'sha512') return
    try {
      await openDb({hash: msg.message, persistConnection: true })
    } catch (err) {
      Alert.alert(
        shared.incorrectPassword,
        shared.incorrectPasswordMessage,
        [{
          text: shared.tryAgain,
          onPress: () => this.setState({password: null})
        }]
      )
      return
    }
    this.props.showApp()
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('message', this.passHashToDb)
  }

  render() {
    return (
      <View style={styles.passwordPrompt}>
        {this.state.showPasswordPrompt &&
          <View>
            <TextInput
              onChangeText={val => this.setState({ password: val })}
              style={styles.passwordField}
              secureTextEntry={true}
              placeholder={passwordPrompt.enterPassword}
            />
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => {
                requestHash(this.state.password)
              }}
            >
              <AppText style={styles.settingsButtonText}>
                {passwordPrompt.title}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={async () => {
                await deleteDbAndOpenNew()
                this.setState({ showApp: true })
              }}
            >
              <AppText style={styles.settingsButtonText}>
                {'Delete old db and make unencrypted new'}
              </AppText>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}