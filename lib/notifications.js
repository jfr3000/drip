import { Platform } from 'react-native'
import {
  tempReminderObservable,
  periodReminderObservable,
} from '../local-storage'
import * as PN from 'react-native-push-notification'
import Moment from 'moment'
import { LocalDate } from '@js-joda/core'

import labels from '../i18n/en/settings'
import { getBleedingDaysSortedByDate } from '../db'
import cycleModule from './cycle'
import nothingChanged from '../db/db-unchanged'

export default function setupNotifications(navigate, setDate) {
  const PushNotification = Platform.OS === 'ios' ? PN : PN.default

  PushNotification.createChannel({
    channelId: 'drip-channel-id', // (required)
    channelName: 'drip reminder', // (required)
    playSound: false, // (optional) default: true
  })

  PushNotification.configure({
    onNotification: (notification) => {
      // https://github.com/zo0r/react-native-push-notification/issues/966#issuecomment-479069106
      if (notification.data?.id === '1' || notification.id === '1') {
        const todayDate = LocalDate.now().toString()
        setDate(todayDate)
        navigate('TemperatureEditView')
      } else {
        navigate('Home')
      }
    },
  })

  tempReminderObservable((reminder) => {
    PushNotification.cancelLocalNotification({ id: '1' })
    if (reminder.enabled) {
      const [hours, minutes] = reminder.time.split(':')
      let target = new Moment()
        .hours(parseInt(hours))
        .minutes(parseInt(minutes))
        .seconds(0)

      if (target.isBefore(new Moment())) {
        target = target.add(1, 'd')
      }

      PushNotification.localNotificationSchedule({
        id: '1',
        userInfo: { id: '1' },
        message: labels.tempReminder.notification,
        date: target.toDate(),
        vibrate: false,
        repeatType: 'day',
        channelId: 'drip-channel-id',
      })
    }
  }, false)

  periodReminderObservable((reminder) => {
    PushNotification.cancelLocalNotification({ id: '2' })
    if (reminder.enabled) setupPeriodReminder()
  }, false)

  getBleedingDaysSortedByDate().addListener((_, changes) => {
    // the listener fires on setup, so we check if there were actually any changes
    if (nothingChanged(changes)) return
    PushNotification.cancelLocalNotification({ id: '2' })
    if (periodReminderObservable.value.enabled) setupPeriodReminder()
  })
}

function setupPeriodReminder() {
  const PushNotification = Platform.OS === 'ios' ? PN : PN.default
  const bleedingPrediction = cycleModule().getPredictedMenses()
  if (bleedingPrediction.length > 0) {
    const predictedBleedingStart = Moment(
      bleedingPrediction[0][0],
      'YYYY-MM-DD'
    )
    // 3 days before and at 6 am
    const reminderDate = predictedBleedingStart
      .subtract(3, 'days')
      .hours(6)
      .minutes(0)
      .seconds(0)

    if (reminderDate.isAfter()) {
      // period is likely to start in 3 to 3 + (length of prediction - 1) days
      const daysToEndOfPrediction = bleedingPrediction[0].length + 2

      PushNotification.localNotificationSchedule({
        id: '2',
        userInfo: { id: '2' },
        message: labels.periodReminder.notification(daysToEndOfPrediction),
        date: reminderDate.toDate(),
        vibrate: false,
        channelId: 'drip-channel-id',
      })
    }
  }
}
