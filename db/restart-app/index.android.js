// Current version of react-native-restart doesn't work with our ios setup
// therefore we have a fork and use different libraries on the platforms
import restart from 'react-native-restart'

export const restartApp = restart.Restart
