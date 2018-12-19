import React, { Component } from 'react'
import {
  View, ScrollView,
  TouchableOpacity,
} from 'react-native'
import styles from '../../../styles/index'
import labels from '../../../i18n/en/settings'
import AppText from '../../app-text'
import openImportDialogAndImport from './import-dialog'
import openShareDialogAndExport from './export-dialog'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
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
