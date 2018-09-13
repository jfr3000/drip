import { Alert } from 'react-native'
import { shared as sharedLabels } from '../labels'

export default function alertError(msg) {
  Alert.alert(sharedLabels.errorTitle, msg)
}