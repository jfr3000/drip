import { Alert } from 'react-native'
import { openDb } from '../../../db'
import { shared } from '../../labels'

export default async function checkPassword({hash, onCancel, onTryAgain }) {
  try {
    await openDb({ hash, persistConnection: false })
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