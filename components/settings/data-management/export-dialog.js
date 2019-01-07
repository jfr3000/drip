import Share from 'react-native-share'

import { getCycleDaysSortedByDate } from '../../../db'
import getDataAsCsvDataUri from '../../../lib/import-export/export-to-csv'
import alertError from '../alert-error'
import settings from '../../../i18n/en/settings'
import { EXPORT_FILE_NAME } from './constants'
import RNFS from 'react-native-fs'

export default async function exportData() {
  let data
  const labels = settings.export
  const cycleDaysByDate = getCycleDaysSortedByDate()

  if (!cycleDaysByDate.length) return alertError(labels.errors.noData)

  try {
    data = getDataAsCsvDataUri(cycleDaysByDate)
    if (!data) {
      return alertError(labels.errors.noData)
    }
  } catch (err) {
    console.error(err)
    return alertError(labels.errors.couldNotConvert)
  }

  try {
    const path = `${RNFS.DocumentDirectoryPath}/${EXPORT_FILE_NAME}`
    await RNFS.writeFile(path, data)

    await Share.open({
      title: labels.title,
      url: `file://${path}`,
      subject: labels.subject,
      type: 'text/csv',
      showAppsToView: true
    })

  } catch (err) {
    console.error(err)
    return alertError(labels.errors.problemSharing)
  }
}

