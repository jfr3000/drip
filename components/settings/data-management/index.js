import React from 'react'
import { ScrollView } from 'react-native'
import AppText from '../../app-text'
import SettingsSegment from '../shared/settings-segment'
import SettingsButton from '../shared/settings-button'
import openImportDialogAndImport from './import-dialog'
import openShareDialogAndExport from './export-dialog'
import DeleteData from './delete-data'
import labels from '../../../i18n/en/settings'

const DataManagement = () => {
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
      <SettingsSegment
        title={labels.deleteSegment.title}
        last
      >
        <AppText>{labels.deleteSegment.explainer}</AppText>
        <DeleteData />
      </SettingsSegment>
    </ScrollView>
  )
}

export default DataManagement