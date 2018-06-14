import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import { LocalDate } from 'js-joda'
import styles from './styles'
import cycleDayModule from './get-cycle-day-number'
import { getOrCreateCycleDay, bleedingDaysSortedByDate, deleteAll } from './db'

const getCycleDayNumber = cycleDayModule()

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.todayDateString = LocalDate.now().toString()
    const cycleDayNumber = getCycleDayNumber(this.todayDateString)

    this.state = {
      welcomeText: determineWelcomeText(cycleDayNumber)
    }

    bleedingDaysSortedByDate.addListener(setStateWithCurrentWelcomeText.bind(this))
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeAllListeners()
  }

  passTodayToDayView() {
    const todayDateString = LocalDate.now().toString()
    const cycleDay = getOrCreateCycleDay(todayDateString)
    const navigate = this.props.navigation.navigate
    navigate('day', { cycleDay })
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>
        <Button
          onPress={() => this.passTodayToDayView()}
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

function determineWelcomeText(cycleDayNumber) {
  const welcomeTextWithCycleDay = `Welcome! Today is day ${cycleDayNumber} of your current cycle`
  const welcomeText = `Welcome! We don't have enough information to know what your current cycle day is`
  return cycleDayNumber ? welcomeTextWithCycleDay : welcomeText
}

function setStateWithCurrentWelcomeText() {
  this.setState({ welcomeText: determineWelcomeText(getCycleDayNumber(this.todayDateString)) })
}
