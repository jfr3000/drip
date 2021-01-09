import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet, View } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'

import AppTextInput from '../../common/app-text-input'
import Button from '../../common/button'

import { requestHash, openDb } from '../../../db'
import { Containers } from '../../../styles'
import settings from '../../../i18n/en/settings'
import { shared } from '../../../i18n/en/labels'

export default class ConfirmWithPassword extends Component {
  constructor() {
    super()

    this.state = { password: null }
    nodejs.channel.addListener('password-check', this.checkPassword, this)
  }

  componentWillUnmount() {
    nodejs.channel.removeListener('password-check', this.checkPassword)
  }

  resetPasswordInput = () => {
    this.setState({ password: null })
  }


  onIncorrectPassword = () => {
    Alert.alert(
      shared.incorrectPassword,
      shared.incorrectPasswordMessage,
      [{
        text: shared.cancel,
        onPress: this.props.onCancel
      }, {
        text: shared.tryAgain,
        onPress: this.resetPasswordInput
      }]
    )
  }

  checkPassword = async hash => {
    try {
      await openDb(hash)
      this.props.onSuccess()
    } catch (err) {
      this.onIncorrectPassword()
    }
  }

  handlePasswordInput = (password) => {
    this.setState({ password })
  }

  initPasswordCheck = () => {
    requestHash('password-check', this.state.password)
  }

  render() {
    const { password } = this.state
    const labels = settings.passwordSettings
    const isPassword = password !== null

    return (
      <React.Fragment>
        <AppTextInput
          onChangeText={this.handlePasswordInput}
          placeholder={labels.enterCurrent}
          value={password}
          secureTextEntry={true}
        />
        <View style={styles.container}>
          <Button onPress={this.props.onCancel}>
            {shared.cancel}
          </Button>
          <Button
            disabled={!isPassword}
            isCTA={isPassword}
            onPress={this.initPasswordCheck}
          >
            {shared.confirmToProceed}
          </Button>
        </View>
      </React.Fragment>
    )

  }
}

ConfirmWithPassword.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer
  }
})