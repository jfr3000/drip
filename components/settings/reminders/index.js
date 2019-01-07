import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'
import SettingsSegment from '../settings-segment'
import TempReminderPicker from './temp-reminder-picker'
import PeriodReminderPicker from './period-reminder'

import labels from '../../../i18n/en/settings'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <SettingsSegment title={labels.tempReminder.title}>
          <TempReminderPicker/>
        </SettingsSegment>
        <SettingsSegment title={labels.periodReminder.title}>
          <PeriodReminderPicker/>
        </SettingsSegment>
      </ScrollView>
    )
  }
}
