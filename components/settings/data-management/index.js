import React, { Component } from 'react'

import AppLoadingView from '../../common/app-loading'
import AppPage from '../../common/app-page'
import AppText from '../../common/app-text'
import Button from '../../common/button'
import Segment from '../../common/segment'

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
    const { currentAction, isLoading } = this.state
    const isDeletingData = currentAction === 'delete'

    return (
      <AppPage>
        {isLoading && <AppLoadingView />}
        {!isLoading &&
          <React.Fragment>
            <Segment title={labels.export.button}>
              <AppText>{labels.export.segmentExplainer}</AppText>
              <Button isCTA onPress={this.startExport}>
                {labels.export.button}
              </Button>
            </Segment>
            <Segment title={labels.import.button}>
              <AppText>{labels.import.segmentExplainer}</AppText>
              <Button isCTA onPress= {this.startImport}>
                {labels.import.button}
              </Button>
            </Segment>
            <Segment title={labels.deleteSegment.title} last>
              <AppText>{labels.deleteSegment.explainer}</AppText>
              <DeleteData
                isDeletingData = {isDeletingData}
                onStartDeletion = {() => this.setCurrentAction('delete')}
              />
            </Segment>
          </React.Fragment>
        }
      </AppPage>
    )
  }
}