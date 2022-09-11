import React, { useState } from 'react'

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

const DataManagement = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentAction, setCurrentAction] = useState(null)

  const startImportFlow = async (shouldDeleteExistingData) => {
    setIsLoading(true)
    const fileContent = await getFileContent()
    if (fileContent) {
      await importData(shouldDeleteExistingData, fileContent)
    }
    setIsLoading(false)
  }

  const startExport = () => {
    setCurrentAction(ACTION_EXPORT)
    openShareDialogAndExport()
  }

  const startImport = () => {
    setCurrentAction(ACTION_IMPORT)
    openImportDialog(startImportFlow)
  }

  if (isLoading) return <AppLoadingView />

  const isDeletingData = currentAction === ACTION_DELETE

  return (
    <AppPage>
      <Segment title={labels.export.button}>
        <AppText>{labels.export.segmentExplainer}</AppText>
        <Button isCTA onPress={startExport}>
          {labels.export.button}
        </Button>
      </Segment>
      <Segment title={labels.import.button}>
        <AppText>{labels.import.segmentExplainer}</AppText>
        <Button isCTA onPress={startImport}>
          {labels.import.button}
        </Button>
      </Segment>
      <Segment title={labels.deleteSegment.title} last>
        <AppText>{labels.deleteSegment.explainer}</AppText>
        <DeleteData
          isDeletingData={isDeletingData}
          onStartDeletion={() => setCurrentAction(ACTION_DELETE)}
        />
      </Segment>
    </AppPage>
  )
}

export default DataManagement
