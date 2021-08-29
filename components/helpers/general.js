import Toast from 'react-native-simple-toast'

export const showToast = (text) => Toast.show(
  text, Toast.SHORT, ['RCTModalHostViewController', 'UIAlertController']
)
