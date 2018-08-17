import React, { Component } from 'react'
import {
  View,
  Button,
  ScrollView,
  Alert
} from 'react-native'

import Share from 'react-native-share'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import rnfs from 'react-native-fs'
import Header from './header'
import styles from '../styles/index'
import { settings as labels } from './labels'
import getDataAsCsvDataUri from '../lib/import-export/export-to-csv'
import importCsv from '../lib/import-export/import-from-csv'

export default class Settings extends Component {
  render() {
    return (
      <ScrollView>
        <Header title='Settings'/>
        <View style={styles.homeButtons}>
          <View style={styles.homeButton}>
            <Button
              onPress={ openShareDialogAndExport }
              title={labels.export.button}>
            </Button>
          </View>
          <View style={styles.homeButton}>
            <Button
              title={labels.import.button}
              onPress={ openImportDialogAndImport }>
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

async function openShareDialogAndExport() {
  let data
  try {
    data = getDataAsCsvDataUri()
    if (!data) {
      return alertError(labels.errors.noData)
    }
  } catch (err) {
    console.error(err)
    return alertError(labels.errors.couldNotConvert)
  }

  try {
    await Share.open({
      title: labels.export.title,
      url: data,
      subject: labels.export.subject,
      type: 'text/csv',
      showAppsToView: true
    })
  } catch (err) {
    console.error(err)
    return alertError(labels.export.errors.problemSharing)
  }
}

function openImportDialogAndImport() {
  Alert.alert(
    labels.import.title,
    labels.import.message,
    [{
      text: labels.import.replaceOption,
      onPress: () => getFileContentAndImport({ deleteExisting: false })
    }, {
      text: labels.import.deleteOption,
      onPress: () => getFileContentAndImport({ deleteExisting: true })
    }, {
      text: labels.shared.cancel, style: 'cancel', onPress: () => { }
    }]
  )
}

async function getFileContentAndImport({ deleteExisting }) {
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

  try {
    await importCsv(fileContent, deleteExisting)
    Alert.alert(labels.import.success.title, labels.import.success.message)
  } catch(err) {
    importError(err.message)
  }
}

function alertError(msg) {
  Alert.alert(labels.shared.errorTitle, msg)
}

function importError(msg) {
  const postFixed = `${msg}\n\n${labels.import.errors.postFix}`
  alertError(postFixed)
}