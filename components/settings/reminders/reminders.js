import React, { Component } from 'react'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import Segment from '../../common/segment'
import TemperatureReminder from './temperature-reminder'

import { periodReminderObservable, savePeriodReminder } from '../../../local-storage'

import labels from '../../../i18n/en/settings'

export default class Reminders extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPeriodReminderEnabled: periodReminderObservable.value.enabled
    }
  }

  periodReminderToggle = (isEnabled) => {
    this.setState({ isPeriodReminderEnabled: isEnabled })
    savePeriodReminder({ enabled: isEnabled })
  }

  render() {
    return (
      <AppPage>
        <Segment title={labels.tempReminder.title}>
          <TemperatureReminder />
        </Segment>
        <Segment title={labels.periodReminder.title} last>
          <AppSwitch
            onToggle={this.periodReminderToggle}
            text={labels.periodReminder.reminderText}
            value={this.state.isPeriodReminderEnabled}
          />
        </Segment>
      </AppPage>
    )
  }
}
