import React, { useState } from 'react'
import RNFS from 'react-native-fs'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'

import Button from '../../common/button'

import ConfirmWithPassword from '../common/confirm-with-password'
import alertError from '../common/alert-error'

import { clearDb, isDbEmpty } from '../../../db'
import { showToast } from '../../helpers/general'
import { hasEncryptionObservable } from '../../../local-storage'
import settings from '../../../i18n/en/settings'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import { EXPORT_FILE_NAME } from './constants'

const exportedFilePath = `${RNFS.DocumentDirectoryPath}/${EXPORT_FILE_NAME}`

const DeleteData = ({ onStartDeletion, isDeletingData }) => {
  const isPasswordSet = hasEncryptionObservable.value
  const [isConfirmingWithPassword, setIsConfirmingWithPassword] =
    useState(false)

  const onAlertConfirmation = () => {
    onStartDeletion()
    if (isPasswordSet) {
      setIsConfirmingWithPassword(true)
    } else {
      deleteAppData()
    }
  }

  const alertBeforeDeletion = async () => {
    const { question, message, confirmation, errors } = settings.deleteSegment
    if (isDbEmpty() && !(await RNFS.exists(exportedFilePath))) {
      alertError(errors.noData)
    } else {
      Alert.alert(question, message, [
        {
          text: confirmation,
          onPress: onAlertConfirmation,
        },
        {
          text: sharedLabels.cancel,
          style: 'cancel',
          onPress: cancelConfirmationWithPassword,
        },
      ])
    }
  }

  const deleteExportedFile = async () => {
    if (await RNFS.exists(exportedFilePath)) {
      await RNFS.unlink(exportedFilePath)
    }
  }

  const deleteAppData = async () => {
    const { errors, success } = settings.deleteSegment

    try {
      if (!isDbEmpty()) {
        clearDb()
      }
      await deleteExportedFile()
      showToast(success.message)
    } catch (err) {
      alertError(errors.couldNotDeleteFile)
    }
    cancelConfirmationWithPassword()
  }

  const cancelConfirmationWithPassword = () => {
    setIsConfirmingWithPassword(false)
  }

  if (isConfirmingWithPassword && isDeletingData) {
    return (
      <ConfirmWithPassword
        onSuccess={deleteAppData}
        onCancel={cancelConfirmationWithPassword}
      />
    )
  }

  return (
    <Button isCTA onPress={alertBeforeDeletion}>
      {settings.deleteSegment.title}
    </Button>
  )
}

DeleteData.propTypes = {
  isDeletingData: PropTypes.bool,
  onStartDeletion: PropTypes.func.isRequired,
}

export default DeleteData
