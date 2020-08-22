import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet, View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'

import AppPage from './common/app-page'
import AppTextInput from './common/app-text-input'
import Button from './common/button'
import Header from './header'

import { saveEncryptionFlag } from '../local-storage'
import { requestHash, deleteDbAndOpenNew, openDb } from '../db'
import { passwordPrompt as labels, shared } from '../i18n/en/labels'
import { Containers, Spacing } from '../styles'

const cancelButton = { text: shared.cancel, style: 'cancel' }

export default class PasswordPrompt extends Component {
  static propTypes = {
    enableShowApp: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { password: null }

    nodejs.channel.addListener('check-pw', this.passHashToDb, this)
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('check-pw', this.passHashToDb)
  }

  onConfirmDeletion = async () => {
    Alert.alert(
      labels.deleteDatabaseTitle,
      labels.deleteDatabaseExplainer,
      [cancelButton, { text: labels.deleteData, onPress: this.onDeleteData}]
    )
  }

  onDeleteData = () => {
    Alert.alert(
      labels.areYouSureTitle,
      labels.areYouSure,
      [cancelButton, {
        text: labels.reallyDeleteData,
        onPress: this.onDeleteDataConfirmation
      }]
    )
  }

  onDeleteDataConfirmation = async () => {
    await deleteDbAndOpenNew()
    await saveEncryptionFlag(false)
    this.props.enableShowApp()
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
    this.props.enableShowApp()
  }

  unlockApp = () => {
    requestHash('check-pw', this.state.password)
  }

  render() {
    const { password } = this.state
    const isPasswordEntered = password && password.length > 0

    return (
      <React.Fragment>
        <Header isSideMenuEnabled={false} />
        <AppPage contentContainerStyle={styles.contentContainer}>
          <AppTextInput
            onChangeText={this.setPassword}
            secureTextEntry={true}
            placeholder={labels.enterPassword}
          />
          <View style={styles.containerButtons}>
            <Button
              disabled={!isPasswordEntered}
              isCTA={isPasswordEntered}
              onPress={this.unlockApp}
            >
              {labels.title}
            </Button>
            <Button onPress={this.onConfirmDeletion}>
              {labels.forgotPassword}
            </Button>
          </View>
        </AppPage>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: Spacing.base
  },
  containerButtons: {
    ...Containers.rowContainer,
    justifyContent: 'space-around'
  }
})