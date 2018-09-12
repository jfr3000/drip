import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { AppText } from './app-text'
import { hasEncryptionObservable } from '../local-storage'
import styles from '../styles'
import { passwordPrompt } from './labels'
import { openDbConnection, requestHash } from '../db'
import App from './app'

export default class PasswordPrompt extends Component {
  constructor() {
    super()
    this.state = {}
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
      async msg => {
        msg = JSON.parse(msg)
        if (msg.type === 'sha512') {
          const key = new Int8Array(64)
          for (let i = 0; i < msg.message.length; i++) {
            key[i] = msg.message.charCodeAt(i)
          }
          try {
            await openDbConnection(key)
          } catch(err) {
            console.log(err)
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
                  style={{
                    borderWidth: 1,
                    borderColor: 'grey',
                    margin: 5
                  }}
                />
                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={async () => {
                    requestHash(this.state.password)
                  }}
                >
                  <AppText style={styles.settingsButtonText}>
                    { passwordPrompt.title }
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