import { Alert } from 'react-native'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import labels from '../../../i18n/en/settings'

export default function showDeleteDialog(okHandler) {

  const { question, message, confirmation } = labels.deleteSegment

  Alert.alert(
    question,
    message,
    [{
      text: confirmation,
      onPress: okHandler
    }, {
      text: sharedLabels.cancel, style: 'cancel', onPress: () => { }
    }]
  )
}