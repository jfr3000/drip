import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import { LocalDate } from 'js-joda'
import styles from './styles'
import getCycleDay from './get-cycle-day'
import { getOrCreateCycleDay } from './db'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  passTodayToDayView() {
    const todayDateString = LocalDate.now().toString()
    const cycleDay = getOrCreateCycleDay(todayDateString)
    const navigate = this.props.navigation.navigate
    navigate('dayView', { cycleDay })
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome! Today is day {getCycleDay()} of your current cycle</Text>
        <Button
          onPress={() => this.passTodayToDayView()}
          title="Edit symptoms for today">
        </Button>
        <Button
          onPress={() => navigate('calendar')}
          title="Go to calendar">
        </Button>
      </View>
    )
  }
}
