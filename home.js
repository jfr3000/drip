import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import getCycleDay from './get-cycle-day'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome! Today is day {getCycleDay()} of your current cycle</Text>
        <Button
          onPress={() => navigate('calendar')}
          title="Go to calendar">
        </Button>
      </View>
    )
  }
}
