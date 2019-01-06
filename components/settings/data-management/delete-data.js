import React, { Component } from 'react'
import RNFS from 'react-native-fs'
import { Alert } from 'react-native'

import { clearDb } from '../../../db'
import { hasEncryptionObservable } from '../../../local-storage'
import SettingsButton from '../settings-button'
import ConfirmWithPassword from './confirm-with-password'
import alertError from '../alert-error'

import settings from '../../../i18n/en/settings'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import { EXPORT_FILE_NAME } from './constants'

export default class DeleteData extends Component {
  constructor() {
    super()
    this.state = {
      isPasswordSet: hasEncryptionObservable.value,
      isConfirmingWithPassword: false
    }
  }

  onAlertConfirmation = () => {
    if (this.state.isPasswordSet) {
      this.setState({ isConfirmingWithPassword: true })
    } else {
      this.deleteAppData()
    }
  }

  alertBeforeDeletion = () => {
    const { question, message, confirmation } = settings.deleteSegment

    Alert.alert(
      question,
      message,
      [{
        text: confirmation,
        onPress: this.onAlertConfirmation
      }, {
        text: sharedLabels.cancel,
        style: 'cancel',
        onPress: this.cancelConfirmationWithPassword
      }]
    )
  }

  deleteExportedFile = async () => {
    const path = `${RNFS.DocumentDirectoryPath}/${EXPORT_FILE_NAME}`
    const isFileExist = await RNFS.exists(path)
    if (isFileExist) {
      await RNFS.unlink(path)
    }
  }

  deleteAppData = async () => {
    const { errors } = settings.deleteSegment
    try {
      await clearDb()
      await this.deleteExportedFile()
      this.props.onDeleteData()
    } catch (err) {
      return alertError(errors.couldNotDeleteFile)
    }
  }

  cancelConfirmationWithPassword = () => {
    this.setState({ isConfirmingWithPassword: false })
  }

  render() {
    const { isConfirmingWithPassword } = this.state

    if (isConfirmingWithPassword) {
      return (
        <ConfirmWithPassword
          onSuccess={this.deleteAppData}
          onCancel={this.cancelConfirmationWithPassword}
        />
      )
    }

    return (
      <SettingsButton onPress={this.alertBeforeDeletion}>
        {settings.deleteSegment.title}
      </SettingsButton>
    )
  }
}