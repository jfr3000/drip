import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import AppText from '../../app-text'
import SettingsSegment from '../settings-segment'
import SettingsButton from '../settings-button'
import openImportDialogAndImport from './import-dialog'
import openShareDialogAndExport from './export-dialog'
import { isDbEmpty } from '../../../db'
import DeleteData from './delete-data'
import labels from '../../../i18n/en/settings'

class DataManagement extends Component {
  constructor() {
    super()
    this.state = {
      isDataEmpty: isDbEmpty()
    }
  }
  onDeleteData = () => {
    this.setState({
      isDataEmpty: true
    })
  }
  render() {
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
        {!isDbEmpty() && (
          <SettingsSegment title={labels.deleteSegment.title}>
            <AppText>{labels.deleteSegment.explainer}</AppText>
            <DeleteData onDeleteData={this.onDeleteData} />
          </SettingsSegment>
        )}
      </ScrollView>
    )
  }
}


export default DataManagement
