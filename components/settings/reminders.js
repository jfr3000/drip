import React, { Component } from 'react'
import DateTimePicker from 'react-native-modal-datetime-picker-nevo'

import AppPage from '../common/app-page'
import AppSwitch from '../common/app-switch'
import Segment from '../common/segment'

import {
  periodReminderObservable,
  savePeriodReminder,
  saveTempReminder,
  tempReminderObservable
} from '../../local-storage'
import padWithZeros from '../helpers/pad-time-with-zeros'

import labels from '../../i18n/en/settings'

export default class Reminders extends Component {
  constructor(props) {
    super(props)

    const { time, enabled } = tempReminderObservable.value
    this.state = {
      periodReminder: periodReminderObservable.value.enabled,
      temperatureReminder: {
        time,
        enabled,
        isTimePickerVisible: false
      }
    }
  }

  periodReminderToggle = (value) => {
    this.setState({ periodReminder: value })
    savePeriodReminder({ enabled: value })
  }

  temperatureReminderToggle = (value) => {
    const { time } = this.state.temperatureReminder
    const temperatureReminder = { enabled: value }

    if (value && !time) temperatureReminder.isTimePickerVisible = true
    if (!value) saveTempReminder({ enabled: false })

    this.setState({ temperatureReminder })
  }

  onPickDate = (date) => {
    const time = padWithZeros(date)
    const temperatureReminder =
      { time, isTimePickerVisible: false, enabled: true }

    this.setState({ temperatureReminder })
    saveTempReminder({ time, enabled: true })
  }

  onPickDateCancel = () => {
    const { time } = this.state.temperatureReminder
    const temperatureReminder = { isTimePickerVisible: false }

    if (!time) temperatureReminder.enabled = false

    this.setState({ temperatureReminder })
  }

  render() {
    const { periodReminder, temperatureReminder } = this.state

    const tempReminderText =
      temperatureReminder.time && temperatureReminder.enabled ?
        labels.tempReminder.timeSet(temperatureReminder.time)
        : labels.tempReminder.noTimeSet

    return (
      <AppPage>
        <Segment title={labels.tempReminder.title}>
          <AppSwitch
            onToggle={this.temperatureReminderToggle}
            text={tempReminderText}
            value={temperatureReminder.enabled}
          />
          <DateTimePicker
            isVisible={temperatureReminder.isTimePickerVisible}
            mode="time"
            onConfirm={this.onPickDate}
            onCancel={this.onPickDateCancel}
          />
        </Segment>
        <Segment title={labels.periodReminder.title} last>
          <AppSwitch
            onToggle={this.periodReminderToggle}
            text={labels.periodReminder.reminderText}
            value={periodReminder}
          />
        </Segment>
      </AppPage>
    )
  }
}
