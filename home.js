import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'

export default class Home extends Component {
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
          onPress={() => navigate('datepicker')}
          title="Go to calendar">
        </Button>
      </View>
    )
  }
}