import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import cycleDayModule from './get-cycle-day-number'
import { getCycleDaysSortedByDateView, deleteAll } from './db'
import { LocalDate } from 'js-joda'

const cycleDaysSortedByDateView = getCycleDaysSortedByDateView()
const getCycleDayNumber = cycleDayModule(cycleDaysSortedByDateView)
const now = new Date()
const cycleDayNumber = getCycleDayNumber(LocalDate.of(now.getFullYear(), now.getMonth() + 1, now.getDate()))
const welcomeTextWithCycleDay = `Welcome! Today is day ${cycleDayNumber} of your current cycle`
const welcomeText = `Welcome! We don't have enough information to know what your current cycle day is`

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      welcomeText: cycleDayNumber ? welcomeTextWithCycleDay : welcomeText
    }
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>
        <Button
          onPress={() => navigate('temperatureList')}
          title="Edit symptoms for today">
        </Button>
        <Button
          onPress={() => navigate('calendar')}
          title="Go to calendar">
        </Button>
        <Button
          onPress={() => deleteAll()}
          title="delete everything">
        </Button>
      </View>
    )
  }
}
