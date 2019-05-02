import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import AppText from '../../app-text'
import FramedSegment from '../../framed-segment'
import AppLoadingView from '../../app-loading'
import SettingsButton from '../shared/settings-button'
import { openImportDialog, getFileContent, importData } from './import-dialog'
import openShareDialogAndExport from './export-dialog'
import DeleteData from './delete-data'
import labels from '../../../i18n/en/settings'

export default class DataManagement extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoading: false }
  }

  onStartLoading = () => {
    this.setState({ isLoading: true })
  }

  onEndLoading = () => {
    this.setState({ isLoading: false })
  }

  onImportData = async (shouldDeleteExistingData) => {

    try {
      this.onStartLoading()
      const fileContent = await getFileContent()
      if (fileContent) {
        await importData(shouldDeleteExistingData, fileContent)
      }
    } catch(err) {
      return
    } finally {
      this.onEndLoading()
    }
  }

  render() {
    return (
      <View flex={1}>
        {this.state.isLoading && <AppLoadingView />}
        {!this.state.isLoading &&
          <ScrollView>
            <View>
              <FramedSegment title={labels.export.button}>
                <AppText>{labels.export.segmentExplainer}</AppText>
                <SettingsButton onPress={openShareDialogAndExport}>
                  {labels.export.button}
                </SettingsButton>
              </FramedSegment>
              <FramedSegment title={labels.import.button}>
                <AppText>{labels.import.segmentExplainer}</AppText>
                <SettingsButton
                  onPress= {() => openImportDialog(this.onImportData)}
                >
                  {labels.import.button}
                </SettingsButton>
              </FramedSegment>
              <FramedSegment
                title={labels.deleteSegment.title}
                last
              >
                <AppText>{labels.deleteSegment.explainer}</AppText>
                <DeleteData />
              </FramedSegment>
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}
