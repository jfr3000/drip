import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Platform } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import rnfs from 'react-native-fs'
import importCsv from '../../../lib/import-export/import-from-csv'
import alertError from '../common/alert-error'
import Segment from '../../common/segment'
import AppText from '../../common/app-text'
import Button from '../../common/button'
import { useTranslation } from 'react-i18next'

export default function ImportData({ resetIsDeletingData, setIsLoading }) {
  const { t } = useTranslation(null, {
    keyPrefix: 'hamburgerMenu.settings.data.import',
  })

  async function startImport(shouldDeleteExistingData) {
    setIsLoading(true)
    await importData(shouldDeleteExistingData)
    setIsLoading(false)
  }

  async function getFileInfo() {
    try {
      const fileInfo = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.csv, 'text/comma-separated-values'],
      })
      return fileInfo
    } catch (error) {
      if (DocumentPicker.isCancel(error)) return // User cancelled the picker, exit any dialogs or menus and move on
      showImportErrorAlert(error)
    }
  }

  async function getFileContent() {
    const fileInfo = await getFileInfo()
    if (!fileInfo) return null

    try {
      const fileContent = await rnfs.readFile(fileInfo.uri, 'utf8')
      return fileContent
    } catch (err) {
      return showImportErrorAlert(t('error.couldNotOpenFile'))
    }
  }

  async function importData(shouldDeleteExistingData) {
    const fileContent = await getFileContent()
    if (!fileContent) return

    try {
      await importCsv(fileContent, shouldDeleteExistingData)
      Alert.alert(t('success.title'), t('success.message'))
    } catch (err) {
      showImportErrorAlert(err.message)
    }
  }

  function openImportDialog() {
    resetIsDeletingData()

    let buttons = [
      {
        text: t('dialog.cancel'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('dialog.replace'),
        onPress: () => startImport(false),
      },
      {
        text: t('dialog.delete'),
        onPress: () => startImport(true),
      },
    ]

    if (Platform.OS === 'android') {
      buttons = [buttons[0], buttons[2], buttons[1]]
    }

    Alert.alert(t('dialog.title'), t('dialog.message'), buttons)
  }

  function showImportErrorAlert(message) {
    const errorMessage = t('error.noDataImported', { message })
    alertError(errorMessage)
  }

  return (
    <Segment title={t('button')}>
      <AppText>{t('segmentExplainer')}</AppText>
      <Button isCTA onPress={openImportDialog}>
        {t('button')}
      </Button>
    </Segment>
  )
}

ImportData.propTypes = {
  resetIsDeletingData: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}
