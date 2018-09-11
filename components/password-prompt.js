import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import AppText from './app-text'
import { hasEncryptionObservable } from '../local-storage'
import styles from '../styles'
import labels from './labels'
import { openDbConnection } from '../db'
import App from './app'

export default class PasswordPrompt extends Component {
  constructor() {
    super()
    this.state = {}
    hasEncryptionObservable.once((hasEncryption) => {
      if (hasEncryption) {
        this.setState({showPasswordPrompt: true})
      } else {
        openDbConnection()
        this.setState({showApp: true})
      }
    })
    nodejs.channel.addListener(
      'message',
      msg => {
        msg = JSON.parse(msg)
        if (msg.type === 'password-check-result') {
          if (msg.message) {
            this.setState({showApp: true})
          } else {
            this.setState({wrongPassword: true})
          }
        }
      },
      this
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showApp ?
          <App password={this.state.password}/>
          :
          <View>
            {this.state.showPasswordPrompt &&
              <View>
                <TextInput
                  onChangeText={val => this.setState({password: val})}
                />
                <TouchableOpacity
                  onPress={async () => {

                  }}
                  style={styles.settingsButton}>
                  <AppText style={styles.settingsButtonText}>
                    {labels.export.button}
                  </AppText>
                </TouchableOpacity>
                {this.state.wrongPassword && <AppText>Wrong PAssword!</AppText>}
              </View>
            }
          </View>
        }
      </View>
    )
  }
}