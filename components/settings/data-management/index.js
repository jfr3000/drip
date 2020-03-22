import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import AppText from '../../common/app-text'
import FramedSegment from '../../common/framed-segment'
import AppLoadingView from '../../common/app-loading'
import SettingsButton from '../shared/settings-button'
import { openImportDialog, getFileContent, importData } from './import-dialog'
import openShareDialogAndExport from './export-dialog'
import DeleteData from './delete-data'
import labels from '../../../i18n/en/settings'

export default class DataManagement extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      currentAction: null
    }
  }

  startLoading = () => {
    this.setState({ isLoading: true })
  }

  endLoading = () => {
    this.setState({ isLoading: false })
  }

  startImportFlow = async (shouldDeleteExistingData) => {
    this.startLoading()
    const fileContent = await getFileContent()
    if (fileContent) {
      await importData(shouldDeleteExistingData, fileContent)
    }
    this.endLoading()
  }

  startExport = () => {
    this.setCurrentAction('export')
    openShareDialogAndExport()
  }

  startImport = () => {
    this.setCurrentAction('import')
    openImportDialog(this.startImportFlow)
  }

  setCurrentAction = (action) => {
    this.setState({ currentAction: action })
  }

  render() {
    const { currentAction } = this.state
    return (
      <View flex={1}>
        {this.state.isLoading && <AppLoadingView />}
        {!this.state.isLoading &&
          <ScrollView>
            <View>
              <FramedSegment title={labels.export.button}>
                <AppText>{labels.export.segmentExplainer}</AppText>
                <SettingsButton onPress={this.startExport}>
                  {labels.export.button}
                </SettingsButton>
              </FramedSegment>
              <FramedSegment title={labels.import.button}>
                <AppText>{labels.import.segmentExplainer}</AppText>
                <SettingsButton
                  onPress= {this.startImport}
                >
                  {labels.import.button}
                </SettingsButton>
              </FramedSegment>
              <FramedSegment
                title={labels.deleteSegment.title}
                last
              >
                <AppText>{labels.deleteSegment.explainer}</AppText>
                <DeleteData
                  isDeletingData = { currentAction === 'delete' }
                  onStartDeletion = {() => this.setCurrentAction('delete')}
                />
              </FramedSegment>
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}