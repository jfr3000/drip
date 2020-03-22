import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'
import FramedSegment from '../../common/framed-segment'
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
        <FramedSegment title={labels.tempReminder.title}>
          <TempReminderPicker/>
        </FramedSegment>
        <FramedSegment title={labels.periodReminder.title}>
          <PeriodReminderPicker/>
        </FramedSegment>
      </ScrollView>
    )
  }
}
