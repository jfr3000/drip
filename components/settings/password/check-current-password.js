import { Alert } from 'react-native'
import { openDb } from '../../../db'
import { shared } from '../../../i18n/en/labels'

export default async function checkPassword({hash, onCancel, onTryAgain }) {
  try {
    await openDb(hash)
    return true
  } catch (err) {
    Alert.alert(
      shared.incorrectPassword,
      shared.incorrectPasswordMessage,
      [{
        text: shared.cancel,
        onPress: onCancel
      }, {
        text: shared.tryAgain,
        onPress: onTryAgain
      }]
    )
    return false
  }
}