import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { SHA512 } from 'jshashes'

import AppTextInput from '../../common/app-text-input'
import Button from '../../common/button'

import { openDb } from '../../../db'
import { Containers } from '../../../styles'
import settings from '../../../i18n/en/settings'
import { shared } from '../../../i18n/en/labels'

const ConfirmWithPassword = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState(null)

  const checkPassword = async () => {
    const hash = new SHA512().hex(password)
    try {
      await openDb(hash)
      onSuccess()
    } catch (err) {
      onIncorrectPassword()
    }
  }

  const onIncorrectPassword = () => {
    Alert.alert(shared.incorrectPassword, shared.incorrectPasswordMessage, [
      {
        text: shared.cancel,
        onPress: onCancel,
      },
      {
        text: shared.tryAgain,
        onPress: () => setPassword(null),
      },
    ])
  }

  const labels = settings.passwordSettings
  const isPassword = password !== null

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
      <AppTextInput
        onChangeText={setPassword}
        placeholder={labels.enterCurrent}
        value={password}
        secureTextEntry
      />
      <View style={styles.container}>
        <Button onPress={onCancel}>{shared.cancel}</Button>
        <Button
          disabled={!isPassword}
          isCTA={isPassword}
          onPress={checkPassword}
        >
          {shared.confirmToProceed}
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

ConfirmWithPassword.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
  },
})

export default ConfirmWithPassword
