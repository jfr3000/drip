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
import styles, { secondaryColor } from '../styles/index'
import config from '../config'
import { settings as settingsLabels, shared as sharedLabels } from './labels'
import getDataAsCsvDataUri from '../lib/import-export/export-to-csv'
import importCsv from '../lib/import-export/import-from-csv'
import { scaleObservable, saveTempScale } from '../local-storage'

export default class Settings extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.settingsSegment}>
          <Text style={styles.settingsSegmentTitle}>
            {settingsLabels.tempScale.segmentTitle}
          </Text>
          <Text>{settingsLabels.tempScale.segmentExplainer}</Text>
          <TempSlider/>
        </View>
        <View style={styles.settingsSegment}>
          <Text style={styles.settingsSegmentTitle}>
            {settingsLabels.export.button}
          </Text>
          <Text>{settingsLabels.export.segmentExplainer}</Text>
          <TouchableOpacity
            onPress={openShareDialogAndExport}
            style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>
              {settingsLabels.export.button}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsSegment}>
          <Text style={styles.settingsSegmentTitle}>
            {settingsLabels.import.button}
          </Text>
          <Text>{settingsLabels.import.segmentExplainer}</Text>
          <TouchableOpacity
            onPress={openImportDialogAndImport}
            style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>
              {settingsLabels.import.button}
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
    this.state = Object.assign({}, scaleObservable.value)
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
      alertError(settingsLabels.tempScale.saveError)
    }
  }

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{`${settingsLabels.tempScale.min} ${this.state.min}`}</Text>
        <Text>{`${settingsLabels.tempScale.max} ${this.state.max}`}</Text>
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
            backgroundColor: secondaryColor,
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
      return alertError(settingsLabels.errors.noData)
    }
  } catch (err) {
    console.error(err)
    return alertError(settingsLabels.errors.couldNotConvert)
  }

  try {
    await Share.open({
      title: settingsLabels.export.title,
      url: data,
      subject: settingsLabels.export.subject,
      type: 'text/csv',
      showAppsToView: true
    })
  } catch (err) {
    console.error(err)
    return alertError(settingsLabels.export.errors.problemSharing)
  }
}

function openImportDialogAndImport() {
  Alert.alert(
    settingsLabels.import.title,
    settingsLabels.import.message,
    [{
      text: settingsLabels.import.replaceOption,
      onPress: () => getFileContentAndImport({ deleteExisting: false })
    }, {
      text: settingsLabels.import.deleteOption,
      onPress: () => getFileContentAndImport({ deleteExisting: true })
    }, {
      text: sharedLabels.cancel, style: 'cancel', onPress: () => { }
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
    return importError(settingsLabels.import.errors.couldNotOpenFile)
  }

  try {
    await importCsv(fileContent, deleteExisting)
    Alert.alert(sharedLabels.successTitle, settingsLabels.import.success.message)
  } catch(err) {
    importError(err.message)
  }
}

function alertError(msg) {
  Alert.alert(sharedLabels.errorTitle, msg)
}

function importError(msg) {
  const postFixed = `${msg}\n\n${settingsLabels.import.errors.postFix}`
  alertError(postFixed)
}
