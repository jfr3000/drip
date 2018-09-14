import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { AppText } from './app-text'
import { hasEncryptionObservable } from '../local-storage'
import styles from '../styles'
import { passwordPrompt as labels, shared } from './labels'
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

  confirmDeletion = async () => {
    Alert.alert(
      labels.deleteDatabaseTitle,
      labels.deleteDatabaseExplainer,
      [{
        text: shared.cancel,
        style: 'cancel'
      }, {
        text: labels.deleteData,
        onPress: () => {
          Alert.alert(
            labels.areYouSureTitle,
            labels.areYouSure,
            [{
              text: shared.cancel,
              style: 'cancel'
            }, {
              text: labels.reallyDeleteData,
              onPress: async () => {
                await deleteDbAndOpenNew()
                this.props.showApp()
              }
            }]
          )
        }
      }]
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('message', this.passHashToDb)
  }

  render() {
    return (
      <View flex={1}>
        {this.state.showPasswordPrompt &&
          <View style={styles.passwordPromptPage}>
            <Image
              source={require('../assets/drip_small.png')}
              style={styles.passwordPromptImage}
            />
            <TextInput
              onChangeText={val => this.setState({ password: val })}
              style={styles.passwordPromptField}
              secureTextEntry={true}
              placeholder={labels.enterPassword}
            />
            <TouchableOpacity
              style={styles.passwordPromptButton}
              onPress={() => {
                requestHash(this.state.password)
              }}
              disabled={!this.state.password}
            >
              <AppText style={styles.passwordPromptButtonText}>
                {labels.title}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.confirmDeletion}
            >
              <AppText style={styles.passwordPromptForgotPasswordText}>
                {labels.forgotPassword}
              </AppText>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}