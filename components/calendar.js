import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import * as styles from '../styles/index'
import { getOrCreateCycleDay, bleedingDaysSortedByDate } from '../db'

export default class CalendarView extends Component {
  constructor(props) {
    super(props)
    this.state = { bleedingDaysInCalFormat: getBleedingDaysInCalFormat(bleedingDaysSortedByDate) }

    this.setStateWithCalendarFormattedDays = (function (CalendarComponent) {
      return function() {
        CalendarComponent.setState({
          bleedingDaysInCalFormat: getBleedingDaysInCalFormat(bleedingDaysSortedByDate)
        })
      }
    })(this)

    bleedingDaysSortedByDate.addListener(this.setStateWithCalendarFormattedDays)
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(this.setStateWithCalendarFormattedDays)
  }

  passDateToDayView(result) {
    const cycleDay = getOrCreateCycleDay(result.dateString)
    const navigate = this.props.navigation.navigate
    navigate('cycleDay', { cycleDay })
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={ this.passDateToDayView.bind(this) }
          markedDates = { this.state.bleedingDaysInCalFormat }
          markingType = {'period'}
        />
      </View>
    )
  }
}

function getBleedingDaysInCalFormat(bleedingDaysSortedByDate) {
  const shadesOfRed = ['#ffbaba', '#ff7b7b', '#ff5252', '#ff0000']
  return bleedingDaysSortedByDate.reduce((acc, day) => {
    acc[day.date] = { startingDay: true, endingDay: true, color: shadesOfRed[day.bleeding.value] }
    return acc
  }, {})
}