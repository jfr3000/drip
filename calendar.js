import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import * as styles from './styles'
import { getOrCreateCycleDay, bleedingDaysSortedByDate } from './db'

export default class DatePickView extends Component {
  constructor(props) {
    super(props)
    this.state = { bleedingDaysInCalFormat: getBleedingDaysInCalFormat(bleedingDaysSortedByDate) }

    bleedingDaysSortedByDate.addListener(setStateWithCalendarFormattedDays.bind(this))
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(setStateWithCalendarFormattedDays)
  }

  passDateToDayView(result) {
    // TODO this also has date as a string, perhaps useful for LocalDateFormat
    const date = new Date(result.year, result.month - 1, result.day)
    const cycleDay = getOrCreateCycleDay(date)
    const navigate = this.props.navigation.navigate
    navigate('dayView', { cycleDay })
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
    const dateString = day.date.toISOString().slice(0, 10)
    acc[dateString] = { startingDay: true, endingDay: true, color: shadesOfRed[day.bleeding.value] }
    return acc
  }, {})
}

function setStateWithCalendarFormattedDays() {
  this.setState({ bleedingDaysInCalFormat: getBleedingDaysInCalFormat(bleedingDaysSortedByDate) })
}