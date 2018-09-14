import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { AppText } from './app-text'
import { hasEncryptionObservable } from '../local-storage'
import styles from '../styles'
import { passwordPrompt, shared } from './labels'
import { openDbConnection, requestHash, deleteDbAndOpenNew, openDb } from '../db'
import App from './app'

export default class PasswordPrompt extends Component {
  constructor() {
    super()
    this.state = {
      password: null
    }
    hasEncryptionObservable.once((hasEncryption) => {
      if (hasEncryption) {
        this.setState({showPasswordPrompt: true})
      } else {
        openDbConnection('something-wrong')
        this.setState({showApp: true})
      }
    })

    nodejs.start('main.js')
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
      this.setState({ showApp: true })
    } catch (err) {
      Alert.alert(
        shared.incorrectPassword,
        shared.incorrectPasswordMessage,
        [{
          text: shared.tryAgain,
          onPress: () => this.setState({password: null})
        }]
      )
    }
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('message', this.passHashToDb)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showApp ?
          <App password={this.state.password}/>
          :
          <View style={styles.passwordPrompt}>
            {this.state.showPasswordPrompt &&
              <View>
                <TextInput
                  onChangeText={val => this.setState({password: val})}
                  style={styles.passwordField}
                />
                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={() => {
                    requestHash(this.state.password)
                  }}
                >
                  <AppText style={styles.settingsButtonText}>
                    { passwordPrompt.title }
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={async () => {
                    await deleteDbAndOpenNew()
                    this.setState({showApp: true})
                  }}
                >
                  <AppText style={styles.settingsButtonText}>
                    {'Delete old db and make unencrypted new'}
                  </AppText>
                </TouchableOpacity>
              </View>
            }
          </View>
        }
      </View>
    )
  }
}