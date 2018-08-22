import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Text
} from 'react-native'
import Slider from '@ptomasroos/react-native-multi-slider'
import Share from 'react-native-share'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import rnfs from 'react-native-fs'
import styles from '../styles/index'
import config from '../config'
import { settings as labels } from './labels'
import getDataAsCsvDataUri from '../lib/import-export/export-to-csv'
import importCsv from '../lib/import-export/import-from-csv'
import { tempScaleObservable, saveTempScale } from '../local-storage'

export default class Settings extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.settingsSegment}>
          <Text style={styles.settingsSegmentTitle}>
            {labels.tempScale.segmentTitle}
          </Text>
          <Text>{labels.tempScale.segmentExplainer}</Text>
          <TempSlider/>
        </View>
        <View style={styles.settingsSegment}>
          <Text style={styles.settingsSegmentTitle}>
            {labels.export.button}
          </Text>
          <Text>{labels.export.segmentExplainer}</Text>
          <TouchableOpacity
            onPress={openShareDialogAndExport}
            style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>
              {labels.export.button}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsSegment}>
          <Text style={styles.settingsSegmentTitle}>
            {labels.import.button}
          </Text>
          <Text>{labels.import.segmentExplainer}</Text>
          <TouchableOpacity
            onPress={openImportDialogAndImport}
            style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>
              {labels.import.button}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

class TempSlider extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, tempScaleObservable.value)
  }

  onValuesChange = (values) => {
    this.setState({
      min: values[0],
      max: values[1]
    })
  }

  onValuesChangeFinish = (values) => {
    this.setState({
      min: values[0],
      max: values[1]
    })
    try {
      saveTempScale(this.state)
    } catch(err) {
      alertError(labels.tempScale.saveError)
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{`${labels.tempScale.min} ${this.state.min}`}</Text>
        <Text>{`${labels.tempScale.max} ${this.state.max}`}</Text>
        <Slider
          values={[this.state.min, this.state.max]}
          min={config.temperatureScale.min}
          max={config.temperatureScale.max}
          step={0.5}
          onValuesChange={this.onValuesChange}
          onValuesChangeFinish={this.onValuesChangeFinish}
          selectedStyle={{
            backgroundColor: 'darkgrey',
          }}
          unselectedStyle={{
            backgroundColor: 'silver',
          }}
          trackStyle={{
            height:10,
          }}
          markerStyle={{
            backgroundColor: '#351c4d',
            height: 20,
            width: 20,
            borderRadius: 100,
            marginTop: 10
          }}
        />
      </View>
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
