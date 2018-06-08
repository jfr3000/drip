import React, { Component } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import * as styles from './styles'
import { getOrCreateCycleDay, bleedingDaysSortedByDate } from './db'



export default class DatePickView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDays: bleedingDaysSortedByDate
    }
  }

  passDateToDayView(result) {
    // TODO this also has date as a string, perhaps useful for LocalDateFormat
    const date = new Date(result.year, result.month - 1, result.day)
    const cycleDay = getOrCreateCycleDay(date)
    const navigate = this.props.navigation.navigate
    navigate('dayView', { cycleDay })
  }

  rerenderCalendar() {

  }

  render() {
    const bleedingDaysInCalFormat = bleedingDaysSortedByDate.reduce((acc, day) => {
      const dateString = day.date.toISOString().slice(0, 10)
      acc[dateString] = { startingDay: true, endingDay: true, color: 'red' }
      return acc
    }, {})
    return (
      <View style={styles.container}>
        <Calendar
          onDayPress={ this.passDateToDayView.bind(this) }
          markedDates = { bleedingDaysInCalFormat }
          markingType = {'period'}
        />
      </View>
    )
  }
}


