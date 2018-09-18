import { Alert } from 'react-native'
import { settings as labels, shared } from '../../labels'

export default function showBackUpReminder(okHandler, isDelete) {
  let title, message
  if (isDelete) {
    title = labels.passwordSettings.deleteBackupReminderTitle
    message = labels.passwordSettings.deleteBackupReminder
  } else {
    title = labels.passwordSettings.backupReminderTitle
    message = labels.passwordSettings.backupReminder
  }

  Alert.alert(
    title,
    message,
    [{
      text: shared.cancel,
      style: 'cancel'
    }, {
      text: shared.ok,
      onPress: okHandler
    }]
  )
}