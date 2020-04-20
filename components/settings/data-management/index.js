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
import { ACTION_DELETE, ACTION_EXPORT, ACTION_IMPORT } from '../../../config'

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
    this.setCurrentAction(ACTION_EXPORT)
    openShareDialogAndExport()
  }

  startImport = () => {
    this.setCurrentAction(ACTION_IMPORT)
    openImportDialog(this.startImportFlow)
  }

  setCurrentAction = (action) => {
    this.setState({ currentAction: action })
  }

  render() {
    const { currentAction, isLoading } = this.state
    const isDeletingData = currentAction === ACTION_DELETE

    return (
      <AppPage>
        {isLoading && <AppLoadingView />}
        {!isLoading &&
          <React.Fragment>
            <Segment title={labels.export.button}>
              <AppText>{labels.export.segmentExplainer}</AppText>
              <Button isCTA isSmall={false} onPress={this.startExport}>
                {labels.export.button}
              </Button>
            </Segment>
            <Segment title={labels.import.button}>
              <AppText>{labels.import.segmentExplainer}</AppText>
              <Button isCTA isSmall={false} onPress={this.startImport}>
                {labels.import.button}
              </Button>
            </Segment>
            <Segment title={labels.deleteSegment.title} last>
              <AppText>{labels.deleteSegment.explainer}</AppText>
              <DeleteData
                isDeletingData = {isDeletingData}
                onStartDeletion = {() => this.setCurrentAction(ACTION_DELETE)}
              />
            </Segment>
          </React.Fragment>
        }
      </AppPage>
    )
  }
}