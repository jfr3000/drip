import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import nodejs from 'nodejs-mobile-react-native'

import AppText from '../../common/app-text'
import AppTextInput from '../../common/app-text-input'
import Button from '../../common/button'

import { requestHash, changeEncryptionAndRestartApp } from '../../../db'
import { Colors, Spacing } from '../../../styles/redesign'
import settings from '../../../i18n/en/settings'

const LISTENER_TYPE = 'create-or-change-pw'

export default class EnterNewPassword extends Component {

  constructor() {
    super()
    this.state = {
      password: '',
      passwordConfirmation: '',
      shouldShowErrorMessage: false,
    }
    nodejs.channel.addListener(
      LISTENER_TYPE,
      changeEncryptionAndRestartApp,
      this
    )
  }

  componentWillUnmount() {
    nodejs.channel.removeListener(LISTENER_TYPE, changeEncryptionAndRestartApp)
  }

  savePassword = () => {
    if (this.comparePasswords()) {
      requestHash(LISTENER_TYPE, this.state.password)
    } else {
      this.setState({ shouldShowErrorMessage: true })
    }
  }

  comparePasswords = () => {
    return this.state.password === this.state.passwordConfirmation
  }

  handlePasswordInput = (password) => {
    this.setState({ password })
  }

  handleConfirmationInput = (passwordConfirmation) => {
    this.setState({ passwordConfirmation })
  }

  render () {
    const {
      password,
      passwordConfirmation,
      shouldShowErrorMessage
    } = this.state
    const labels = settings.passwordSettings
    const isButtonActive =
      (password.length > 0) && (passwordConfirmation.length > 0)

    return (
      <React.Fragment>
        <AppTextInput
          onChangeText={this.handlePasswordInput}
          placeholder={labels.enterNew}
          textContentType="password"
          value={password}
        />
        <AppTextInput
          onChangeText={this.handleConfirmationInput}
          placeholder={labels.confirmPassword}
          textContentType="password"
          value={passwordConfirmation}
        />
        {shouldShowErrorMessage &&
          <AppText style={styles.error}>{labels.passwordsDontMatch}</AppText>
        }
        <Button isCTA={isButtonActive} isSmall onPress={this.savePassword}>
          {labels.savePassword}
        </Button>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  error: {
    color: Colors.orange,
    marginTop: Spacing.base
  }
})