import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'
import { saveEncryptionFlag } from '../local-storage'
import AppText from './app-text'
import Header from './header'
import styles from '../styles'
import { passwordPrompt as labels, shared, menuTitles } from '../i18n/en/labels'
import { requestHash, deleteDbAndOpenNew, openDb } from '../db'

export default class PasswordPrompt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: null
    }

    nodejs.channel.addListener(
      'check-pw',
      this.passHashToDb,
      this
    )

    this.tryToOpenDb()
  }

  async tryToOpenDb() {
    const connected = await openDb()
    if (!connected) {
      this.setState({ showPasswordPrompt: true })
      await saveEncryptionFlag(true)
      return
    }
    await saveEncryptionFlag(false)
    this.props.showApp()
  }

  passHashToDb = async hash => {
    const connected = await openDb(hash)
    if (!connected) {
      Alert.alert(
        shared.incorrectPassword,
        shared.incorrectPasswordMessage,
        [{
          text: shared.tryAgain,
          onPress: () => this.setState({ password: null })
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
                await saveEncryptionFlag(false)
                this.props.showApp()
              }
            }]
          )
        }
      }]
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('check-pw', this.passHashToDb)
  }

  render() {
    return (
      <View flex={1}>
        <Header title={menuTitles.PasswordPrompt.toLowerCase()} />
        {this.state.showPasswordPrompt &&
          <View style={styles.passwordPromptPage}>

            <TextInput
              onChangeText={val => this.setState({ password: val })}
              style={styles.passwordPromptField}
              secureTextEntry={true}
              placeholder={labels.enterPassword}
            />
            <TouchableOpacity
              style={styles.passwordPromptButton}
              onPress={() => {
                requestHash('check-pw', this.state.password)
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