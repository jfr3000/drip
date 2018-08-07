import React, { Component } from 'react'
import {
  View,
  Button,
  ScrollView,
  Alert
} from 'react-native'

import Share from 'react-native-share'
import getDataAsCsvDataUri from '../lib/export-to-csv'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import rnfs from 'react-native-fs'
import styles from '../styles/index'
import { settings as labels } from './labels'
import { importCsv } from '../db'

export default class Settings extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.homeButtons}>
          <View style={styles.homeButton}>
            <Button
              onPress={async () => {
                let data
                try {
                  data = getDataAsCsvDataUri()
                  if (!data) {
                    return Alert.alert(labels.errors.noData)
                  }
                } catch (err) {
                  console.error(err)
                  return Alert.alert(labels.errors.couldNotConvert)
                }

                try {
                  await Share.open({
                    title: labels.exportTitle,
                    url: data,
                    subject: labels.exportSubject,
                    type: 'text/csv',
                    showAppsToView: true
                  })
                } catch (err) {
                  console.error(err)
                  return Alert.alert(labels.errors.problemSharing)
                }
              }}
              title={labels.buttonLabel}>
            </Button>
          </View>
          <View style={styles.homeButton}>
            <Button
              onPress={ getFileContentAndImport }
              title="Import data">
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

async function getFileContentAndImport() {
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
    return Alert.alert('There was a problem opening the file picker')
  }

  let fileContent
  try {
    fileContent = await rnfs.readFile(fileInfo.uri, 'utf8')
  } catch (err) {
    console.log(err)
    return Alert.alert('Could not open file')
  }

  try {
    importCsv(fileContent)
  } catch(err) {
    //TODO
  }
}
