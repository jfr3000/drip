import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'
import TempReminderPicker from './temp-reminder-picker'
import PeriodReminderPicker from './period-reminder'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <TempReminderPicker/>
        <PeriodReminderPicker/>
      </ScrollView>
    )
  }
}
