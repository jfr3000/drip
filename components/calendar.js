import React, { Component } from 'react'
import { View } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import Header from './header'
import * as styles from '../styles'
import { getOrCreateCycleDay, bleedingDaysSortedByDate } from '../db'

export default class CalendarView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bleedingDaysInCalFormat: toCalFormat(bleedingDaysSortedByDate)
    }

    this.setStateWithCalFormattedDays = (function (CalendarComponent) {
      return function() {
        CalendarComponent.setState({
          bleedingDaysInCalFormat: toCalFormat(bleedingDaysSortedByDate)
        })
      }
    })(this)

    bleedingDaysSortedByDate.addListener(this.setStateWithCalFormattedDays)
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(this.setStateWithCalFormattedDays)
  }

  passDateToDayView(result) {
    const cycleDay = getOrCreateCycleDay(result.dateString)
    const navigate = this.props.navigation.navigate
    navigate('CycleDay', { cycleDay })
  }

  render() {
    return (
      <View>
        <Header title='Calendar' />
        <View style={styles.container}>
          <CalendarList
            onDayPress={this.passDateToDayView.bind(this)}
            markedDates={this.state.bleedingDaysInCalFormat}
            markingType={'period'}
          />
        </View>
      </View>
    )
  }
}

function toCalFormat(bleedingDaysSortedByDate) {
  const shadesOfRed = ['#ffbaba', '#ff7b7b', '#ff5252', '#ff0000']
  return bleedingDaysSortedByDate.reduce((acc, day) => {
    acc[day.date] = {
      startingDay: true,
      endingDay: true,
      color: shadesOfRed[day.bleeding.value]
    }
    return acc
  }, {})
}