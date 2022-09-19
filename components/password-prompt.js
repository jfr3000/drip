import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
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

const PasswordPrompt = ({ enableShowApp }) => {
  const [password, setPassword] = useState(null)
  const unlockApp = () => requestHash('check-pw', password)
  const isPasswordEntered = Boolean(password)
  const passHashToDb = async (hash) => {
    const connected = await openDb(hash)

    if (!connected) {
      Alert.alert(shared.incorrectPassword, shared.incorrectPasswordMessage, [
        {
          text: shared.tryAgain,
          onPress: () => setPassword(null),
        },
      ])
      return
    }

    enableShowApp()
  }

  useEffect(() => {
    const listener = nodejs.channel.addListener('check-pw', passHashToDb, this)

    return () => listener.remove()
  }, [])

  const onDeleteDataConfirmation = async () => {
    await deleteDbAndOpenNew()
    await saveEncryptionFlag(false)
    enableShowApp()
  }

  const onDeleteData = () => {
    Alert.alert(labels.areYouSureTitle, labels.areYouSure, [
      cancelButton,
      {
        text: labels.reallyDeleteData,
        onPress: onDeleteDataConfirmation,
      },
    ])
  }

  const onConfirmDeletion = async () => {
    Alert.alert(labels.deleteDatabaseTitle, labels.deleteDatabaseExplainer, [
      cancelButton,
      { text: labels.deleteData, onPress: onDeleteData },
    ])
  }

  return (
    <>
      <Header isStatic />
      <AppPage contentContainerStyle={styles.contentContainer}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
          <AppTextInput
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder={labels.enterPassword}
          />
          <View style={styles.containerButtons}>
            <Button onPress={onConfirmDeletion}>{labels.forgotPassword}</Button>
            <Button
              disabled={!isPasswordEntered}
              isCTA={isPasswordEntered}
              onPress={unlockApp}
            >
              {labels.title}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </AppPage>
    </>
  )
}

PasswordPrompt.propTypes = {
  enableShowApp: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: Spacing.base,
  },
  containerButtons: {
    ...Containers.rowContainer,
    justifyContent: 'space-around',
  },
})

export default PasswordPrompt
