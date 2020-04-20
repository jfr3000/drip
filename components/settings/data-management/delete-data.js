import React, { Component } from 'react'
import RNFS from 'react-native-fs'
import { Alert, ToastAndroid } from 'react-native'
import PropTypes from 'prop-types'

import Button from '../../common/button'

import ConfirmWithPassword from '../shared/confirm-with-password'
import alertError from '../shared/alert-error'

import { clearDb, isDbEmpty } from '../../../db'
import { hasEncryptionObservable } from '../../../local-storage'
import settings from '../../../i18n/en/settings'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import { EXPORT_FILE_NAME } from './constants'

const exportedFilePath = `${RNFS.DocumentDirectoryPath}/${EXPORT_FILE_NAME}`

export default class DeleteData extends Component {
  constructor() {
    super()

    this.state = {
      isPasswordSet: hasEncryptionObservable.value,
      isConfirmingWithPassword: false
    }
  }

  onAlertConfirmation = () => {
    this.props.onStartDeletion()
    if (this.state.isPasswordSet) {
      this.setState({ isConfirmingWithPassword: true })
    } else {
      this.deleteAppData()
    }
  }

  alertBeforeDeletion = async () => {
    const { question, message, confirmation, errors } = settings.deleteSegment
    if (isDbEmpty() && !await RNFS.exists(exportedFilePath)) {
      alertError(errors.noData)
    } else {
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
  }

  deleteExportedFile = async () => {
    if (await RNFS.exists(exportedFilePath)) {
      await RNFS.unlink(exportedFilePath)
    }
  }

  deleteAppData = async () => {
    const { errors, success } = settings.deleteSegment

    try {
      if (!isDbEmpty()) {
        clearDb()
      }
      await this.deleteExportedFile()
      ToastAndroid.show(success.message, ToastAndroid.LONG)
    } catch (err) {
      alertError(errors.couldNotDeleteFile)
    }
    this.cancelConfirmationWithPassword()
  }

  cancelConfirmationWithPassword = () => {
    this.setState({ isConfirmingWithPassword: false })
  }

  render() {
    const { isConfirmingWithPassword } = this.state
    const { isDeletingData } = this.props

    if (isConfirmingWithPassword && isDeletingData) {
      return (
        <ConfirmWithPassword
          onSuccess={this.deleteAppData}
          onCancel={this.cancelConfirmationWithPassword}
        />
      )
    }

    return (
      <Button isCTA isSmall={false} onPress={this.alertBeforeDeletion}>
        {settings.deleteSegment.title}
      </Button>
    )
  }
}

DeleteData.propTypes = {
  isDeletingData: PropTypes.bool,
  onStartDeletion: PropTypes.func.isRequired
}