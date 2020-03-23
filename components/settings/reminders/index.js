import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'
import Segment from '../../common/segment'
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
        <Segment title={labels.tempReminder.title}>
          <TempReminderPicker/>
        </Segment>
        <Segment title={labels.periodReminder.title}>
          <PeriodReminderPicker/>
        </Segment>
      </ScrollView>
    )
  }
}
