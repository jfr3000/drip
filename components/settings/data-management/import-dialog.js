import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import rnfs from 'react-native-fs'
import importCsv from '../../../lib/import-export/import-from-csv'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import labels from '../../../i18n/en/settings'
import alertError from '../common/alert-error'

export function openImportDialog(onImportData) {
  Alert.alert(labels.import.title, labels.import.message, [
    {
      text: sharedLabels.cancel,
      style: 'cancel',
      onPress: () => {},
    },
    {
      text: labels.import.replaceOption,
      onPress: () => onImportData(false),
    },
    {
      text: labels.import.deleteOption,
      onPress: () => onImportData(true),
    },
  ])
}

export async function getFileContent() {
  let fileInfo
  try {
    fileInfo = await DocumentPicker.pick({
      type: [DocumentPicker.types.csv, 'text/comma-separated-values'],
    })
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      return
    } else {
      importError(error)
    }
  }

  let fileContent
  try {
    fileContent = await rnfs.readFile(fileInfo.uri, 'utf8')
  } catch (err) {
    return importError(labels.import.errors.couldNotOpenFile)
  }

  return fileContent
}

export async function importData(shouldDeleteExistingData, fileContent) {
  try {
    await importCsv(fileContent, shouldDeleteExistingData)
    Alert.alert(sharedLabels.successTitle, labels.import.success.message)
  } catch (err) {
    importError(err.message)
  }
}

function importError(msg) {
  const postFixed = `${msg}\n\n${labels.import.errors.postFix}`
  alertError(postFixed)
}
