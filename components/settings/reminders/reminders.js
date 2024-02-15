import React, { useState } from 'react'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import Segment from '../../common/segment'
import TemperatureReminder from './temperature-reminder'

import {
  periodReminderObservable,
  savePeriodReminder,
  periodPredictionObservable,
  temperatureTrackingCategoryObservable,
} from '../../../local-storage'

import labels from '../../../i18n/en/settings'
import { Alert, Pressable } from 'react-native'

const Reminders = () => {
  const isPeriodPredictionDisabled = !periodPredictionObservable.value

  const [isPeriodReminderEnabled, setIsPeriodReminderEnabled] = useState(
    periodReminderObservable.value.enabled
  )
  const periodReminderToggle = (isEnabled) => {
    setIsPeriodReminderEnabled(isEnabled)
    savePeriodReminder({ enabled: isEnabled })
  }

  const reminderDisabledPrompt = () => {
    if (!periodPredictionObservable.value) {
      Alert.alert(
        labels.periodReminder.alertNoPeriodReminder.title,
        labels.periodReminder.alertNoPeriodReminder.message
      )
    }
  }

  const tempReminderDisabledPrompt = () => {
    if (!temperatureTrackingCategoryObservable.value) {
      Alert.alert(
        labels.tempReminder.alertNoTempReminder.title,
        labels.tempReminder.alertNoTempReminder.message
      )
    }
  }
  return (
    <AppPage>
      <Pressable onPress={reminderDisabledPrompt}>
        <Segment title={labels.periodReminder.title}>
          <AppSwitch
            onToggle={periodReminderToggle}
            text={labels.periodReminder.reminderText}
            value={isPeriodReminderEnabled}
            disabled={isPeriodPredictionDisabled}
          />
        </Segment>
      </Pressable>
      <Pressable onPress={tempReminderDisabledPrompt}>
        <Segment title={labels.tempReminder.title} last>
          <TemperatureReminder />
        </Segment>
      </Pressable>
    </AppPage>
  )
}

export default Reminders
