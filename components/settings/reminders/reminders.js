import React, { useState } from 'react'

import AppPage from '../../common/app-page'
import AppSwitch from '../../common/app-switch'
import Segment from '../../common/segment'
import TemperatureReminder from './temperature-reminder'

import {
  periodReminderObservable,
  savePeriodReminder,
} from '../../../local-storage'

import labels from '../../../i18n/en/settings'

const Reminders = () => {
  const [isPeriodReminderEnabled, setIsPeriodReminderEnabled] = useState(
    periodReminderObservable.value.enabled
  )
  const periodReminderToggle = (isEnabled) => {
    setIsPeriodReminderEnabled(isEnabled)
    savePeriodReminder({ enabled: isEnabled })
  }

  return (
    <AppPage>
      <Segment title={labels.periodReminder.title}>
        <AppSwitch
          onToggle={periodReminderToggle}
          text={labels.periodReminder.reminderText}
          value={isPeriodReminderEnabled}
        />
      </Segment>
      <Segment title={labels.tempReminder.title} last>
        <TemperatureReminder />
      </Segment>
    </AppPage>
  )
}

export default Reminders
