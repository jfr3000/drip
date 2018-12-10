import Share from 'react-native-share'
import getDataAsCsvDataUri from '../../lib/import-export/export-to-csv'
import alertError from './alert-error'
import { settings } from '../../i18n/en/settings'

export default async function openShareDialogAndExport() {
  let data
  const labels = settings.export
  try {
    data = getDataAsCsvDataUri()
    if (!data) {
      return alertError(labels.errors.noData)
    }
  } catch (err) {
    console.error(err)
    return alertError(labels.errors.couldNotConvert)
  }

  try {
    await Share.open({
      title: labels.title,
      url: data,
      subject: labels.subject,
      type: 'text/csv',
      showAppsToView: true
    })
  } catch (err) {
    console.error(err)
    return alertError(labels.errors.problemSharing)
  }
}

