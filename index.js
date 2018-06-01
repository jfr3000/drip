import { AppRegistry } from 'react-native'
import Home from './app'
import { openDatabase } from './db'

// TODO error handling
openDatabase()
  .then(() => {
    AppRegistry.registerComponent('home', () => Home)
  })