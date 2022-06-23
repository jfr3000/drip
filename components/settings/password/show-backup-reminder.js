import { Alert, Platform } from 'react-native'
import { shared } from '../../../i18n/en/labels'
import labels from '../../../i18n/en/settings'

export default function showBackUpReminder(okHandler, cancelHandler, isDelete) {
  const { title, message } = isDelete
    ? labels.passwordSettings.deleteBackupReminder
    : labels.passwordSettings.backupReminder

  const { backupReminderAppendix } = labels.passwordSettings
  const appendix =
    Platform.OS === 'ios'
      ? backupReminderAppendix.ios
      : backupReminderAppendix.android

  Alert.alert(
    title,
    message + appendix,
    [
      {
        text: shared.cancel,
        onPress: cancelHandler,
        style: 'cancel',
      },
      {
        text: shared.ok,
        onPress: okHandler,
      },
    ],
    { onDismiss: cancelHandler }
  )
}
