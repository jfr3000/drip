import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import { createStackNavigator } from 'react-navigation'
import temperatureList from './List'

class home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome! Today is day 6 of your current cycle</Text>
        <Button
          onPress={() => navigate('temperatureList')}
          title="Edit symptoms for today">
        </Button>
        <Button
          onPress={() => {}}
          title="Go to calendar">
        </Button>
      </View>
    )
  }
}

export default createStackNavigator({
  home: { screen: home },
  temperatureList: { screen: temperatureList }
})