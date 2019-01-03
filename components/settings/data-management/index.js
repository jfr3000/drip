import React from 'react'
import { ScrollView } from 'react-native'
import labels from '../../../i18n/en/settings'
import AppText from '../../app-text'
import SettingsSegment from '../settings-segment'
import SettingsButton from '../settings-button'
import openImportDialogAndImport from './import-dialog'
import openShareDialogAndExport from './export-dialog'

const Settings = () => {
  return (
    <ScrollView>
      <SettingsSegment title={labels.export.button}>
        <AppText>{labels.export.segmentExplainer}</AppText>
        <SettingsButton onPress={openShareDialogAndExport}>
          {labels.export.button}
        </SettingsButton>
      </SettingsSegment>
      <SettingsSegment title={labels.import.button}>
        <AppText>{labels.import.segmentExplainer}</AppText>
        <SettingsButton onPress={openImportDialogAndImport}>
          {labels.import.button}
        </SettingsButton>
      </SettingsSegment>
      <SettingsSegment title={labels.deleteSegment.title}>
        <AppText>{labels.deleteSegment.explainer}</AppText>
        <SettingsButton onPress={openImportDialogAndImport}>
          {labels.deleteSegment.title}
        </SettingsButton>
      </SettingsSegment>
    </ScrollView>
  )
}

export default Settings
