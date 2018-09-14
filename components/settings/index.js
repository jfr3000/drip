import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import styles from '../../styles/index'
import { settings as labels } from '../labels'
import { AppText } from '../app-text'
import TempReminderPicker from './temp-reminder-picker'
import TempSlider from './temp-slider'
import openImportDialogAndImport from './import-dialog'
import openShareDialogAndExport from './export-dialog'
import PasswordSetting from './password-setting'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <TempReminderPicker/>
        <View style={styles.settingsSegment}>
          <AppText style={styles.settingsSegmentTitle}>
            {labels.tempScale.segmentTitle}
          </AppText>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          <TempSlider/>
        </View>
        <PasswordSetting />
        <View style={styles.settingsSegment}>
          <AppText style={styles.settingsSegmentTitle}>
            {labels.export.button}
          </AppText>
          <AppText>{labels.export.segmentExplainer}</AppText>
          <TouchableOpacity
            onPress={openShareDialogAndExport}
            style={styles.settingsButton}>
            <AppText style={styles.settingsButtonText}>
              {labels.export.button}
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsSegment}>
          <AppText style={styles.settingsSegmentTitle}>
            {labels.import.button}
          </AppText>
          <AppText>{labels.import.segmentExplainer}</AppText>
          <TouchableOpacity
            onPress={openImportDialogAndImport}
            style={styles.settingsButton}>
            <AppText style={styles.settingsButtonText}>
              {labels.import.button}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
