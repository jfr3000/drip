import { Alert } from 'react-native'
import { settings as labels, shared } from '../../labels'

export default function showBackUpReminder(okHandler) {
  Alert.alert(
    labels.passwordSettings.backupReminderTitle,
    labels.passwordSettings.backupReminder,
    [{
      text: shared.cancel,
      style: 'cancel'
    }, {
      text: shared.ok,
      onPress: okHandler
    }]
  )
}