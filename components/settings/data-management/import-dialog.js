import { Alert } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import rnfs from 'react-native-fs'
import importCsv from '../../../lib/import-export/import-from-csv'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import labels from '../../../i18n/en/settings'
import alertError from '../shared/alert-error'

export function openImportDialog(onImportData) {
  Alert.alert(
    labels.import.title,
    labels.import.message,
    [{
      text: sharedLabels.cancel, style: 'cancel', onPress: () => { }
    }, {
      text: labels.import.deleteOption,
      onPress: () => onImportData(true)
    }, {
      text: labels.import.replaceOption,
      onPress: () => onImportData(false)
    }]
  )
}

export async function getFileContent() {
  let fileInfo
  try {
    fileInfo = await new Promise((resolve, reject) => {
      DocumentPicker.show({
        filetype: [DocumentPickerUtil.allFiles()],
      }, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  } catch (err) {
    // because cancelling also triggers an error, we do nothing here
    return
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
  } catch(err) {
    importError(err.message)
  }
}

function importError(msg) {
  const postFixed = `${msg}\n\n${labels.import.errors.postFix}`
  alertError(postFixed)
}