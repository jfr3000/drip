import Share from 'react-native-share'
import getDataAsCsvDataUri from '../../lib/import-export/export-to-csv'
import alertError from './alert-error'
import { settings as labels } from '../../i18n/en/settings'

export default async function openShareDialogAndExport() {
  let data
  try {
    data = getDataAsCsvDataUri()
    if (!data) {
      return alertError(labels.export.errors.noData)
    }
  } catch (err) {
    console.error(err)
    return alertError(labels.errors.couldNotConvert)
  }

  try {
    await Share.open({
      title: labels.export.title,
      url: data,
      subject: labels.export.subject,
      type: 'text/csv',
      showAppsToView: true
    })
  } catch (err) {
    console.error(err)
    return alertError(labels.export.errors.problemSharing)
  }
}

