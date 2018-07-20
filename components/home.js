import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  ScrollView
} from 'react-native'
import { LocalDate } from 'js-joda'
import styles from '../styles'
import cycleDayModule from '../lib/get-cycle-day-number'
import { getOrCreateCycleDay, bleedingDaysSortedByDate, deleteAll } from '../db'

const getCycleDayNumber = cycleDayModule()

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.todayDateString = LocalDate.now().toString()
    const cycleDayNumber = getCycleDayNumber(this.todayDateString)

    this.state = {
      welcomeText: determineWelcomeText(cycleDayNumber)
    }

    this.setStateWithCurrentWelcomeText = (function (HomeComponent) {
      return function () {
        HomeComponent.setState({
          welcomeText: determineWelcomeText(getCycleDayNumber(HomeComponent.todayDateString))
        })
      }
    })(this)

    bleedingDaysSortedByDate.addListener(this.setStateWithCurrentWelcomeText)
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(this.setStateWithCurrentWelcomeText)
  }

  passTodayToDayView() {
    const todayDateString = LocalDate.now().toString()
    const cycleDay = getOrCreateCycleDay(todayDateString)
    const navigate = this.props.navigation.navigate
    navigate('cycleDay', { cycleDay })
  }

  render() {
    const navigate = this.props.navigation.navigate
    return (
      <ScrollView>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>
        <View style={styles.homeButtons}>
          <View style={styles.homeButton}>
            <Button
              onPress={() => this.passTodayToDayView()}
              title="Edit symptoms for today">
            </Button>
          </View>
          <View style={styles.homeButton}>
            <Button
              onPress={() => navigate('calendar')}
              title="Go to calendar">
            </Button>
          </View>
          <View style={styles.homeButton}>
            <Button
              onPress={() => navigate('chart')}
              title="Go to chart">
            </Button>
          </View>
          <View style={styles.homeButton}>
            <Button
              onPress={() => deleteAll()}
              title="delete everything">
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

function determineWelcomeText(cycleDayNumber) {
  const welcomeTextWithCycleDay = `Welcome! Today is day ${cycleDayNumber} of your current cycle`
  const welcomeText = `Welcome! We don't have enough information to know what your current cycle day is`
  return cycleDayNumber ? welcomeTextWithCycleDay : welcomeText
}

