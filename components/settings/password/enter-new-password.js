import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { SHA512 } from 'jshashes'

import AppText from '../../common/app-text'
import AppTextInput from '../../common/app-text-input'
import Button from '../../common/button'

import { Colors, Spacing } from '../../../styles'
import settings from '../../../i18n/en/settings'

const EnterNewPassword = ({ changeEncryptionAndRestart }) => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [shouldShowErrorMessage, setShouldShowErrorMessage] = useState(false)

  const savePassword = () => {
    if (comparePasswords()) {
      const hash = new SHA512().hex(password)
      changeEncryptionAndRestart(hash)
    } else {
      setShouldShowErrorMessage(true)
    }
  }

  const comparePasswords = () => password === passwordConfirmation

  const labels = settings.passwordSettings
  const isButtonActive = password.length > 0 && passwordConfirmation.length > 0

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
      <AppTextInput
        onChangeText={setPassword}
        placeholder={labels.enterNew}
        textContentType="password"
        value={password}
        secureTextEntry={true}
      />
      <AppTextInput
        onChangeText={setPasswordConfirmation}
        placeholder={labels.confirmPassword}
        textContentType="password"
        value={passwordConfirmation}
        secureTextEntry={true}
      />
      {shouldShowErrorMessage && (
        <AppText style={styles.error}>{labels.passwordsDontMatch}</AppText>
      )}
      <Button
        isCTA={isButtonActive}
        disabled={!isButtonActive}
        onPress={savePassword}
      >
        {labels.savePassword}
      </Button>
    </KeyboardAvoidingView>
  )
}

EnterNewPassword.propTypes = {
  changeEncryptionAndRestart: PropTypes.func,
}

const styles = StyleSheet.create({
  error: {
    color: Colors.orange,
    marginTop: Spacing.base,
  },
})

export default EnterNewPassword
