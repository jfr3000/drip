import React, { useState } from 'react'
import { Platform } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

import AppSwitch from '../../common/app-switch'

import {
  saveTempReminder,
  tempReminderObservable,
  temperatureTrackingCategoryObservable,
} from '../../../local-storage'
import padWithZeros from '../../helpers/pad-time-with-zeros'

import labels from '../../../i18n/en/settings'

const TemperatureReminder = () => {
  const [isEnabled, setIsEnabled] = useState(
    tempReminderObservable.value.enabled
  )
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false)
  const [time, setTime] = useState(tempReminderObservable.value.time)

  const temperatureReminderToggle = (value) => {
    if (value) {
      setIsTimePickerVisible(true)
    } else {
      saveTempReminder({ enabled: false })
      setIsEnabled(false)
    }
  }

  const onPickDate = (date) => {
    const time = padWithZeros(date)
    setIsEnabled(true)
    setIsTimePickerVisible(false)
    setTime(time)
    saveTempReminder({ time, enabled: true })
  }

  const onPickDateCancel = () => {
    setIsTimePickerVisible(false)
  }

  const tempReminderText =
    time && isEnabled
      ? labels.tempReminder.timeSet(time)
      : labels.tempReminder.noTimeSet

  return (
    <>
      <AppSwitch
        onToggle={temperatureReminderToggle}
        text={tempReminderText}
        value={isEnabled}
        disabled={!temperatureTrackingCategoryObservable.value}
      />
      <DateTimePicker
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={onPickDate}
        onCancel={onPickDateCancel}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      />
    </>
  )
}

export default TemperatureReminder
