// Current version of react-native-restart doesn't work with our ios setup
// therefore we have a fork and use different libraries on the platforms
import RNExitApp from 'react-native-exit-app-v2'
import { Alert } from 'react-native'

export const restartApp = () => {
  Alert.alert('Closing app', 'App is shutting down. Please restart.')
  setTimeout(() => {
    RNExitApp.exitApp()
  }, 3000)
}
