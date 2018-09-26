import {tempReminderObservable, periodReminderObservable} from '../local-storage'
import Notification from 'react-native-push-notification'
import { LocalDate } from 'js-joda'
import Moment from 'moment'
import { settings as labels } from '../components/labels'
import { getOrCreateCycleDay, getBleedingDaysSortedByDate } from '../db'
import cycleModule from './cycle'

export default function setupNotifications(navigate) {
  Notification.configure({
    onNotification: (notification) => {
      if (notification.id === '1') {
        const todayDateString = LocalDate.now().toString()
        const cycleDay = getOrCreateCycleDay(todayDateString)
        navigate('TemperatureEditView', { cycleDay })
      } else {
        navigate('Home')
      }
    }
  })

  tempReminderObservable(reminder => {
    Notification.cancelLocalNotifications({id: '1'})
    if (reminder.enabled) {
      const [hours, minutes] = reminder.time.split(':')
      let target = new Moment()
        .hours(parseInt(hours))
        .minutes(parseInt(minutes))
        .seconds(0)

      if(target.isBefore(new Moment())) {
        target = target.add(1, 'd')
      }

      Notification.localNotificationSchedule({
        id: '1',
        message: labels.tempReminder.notification,
        date: target.toDate(),
        vibrate: false,
        repeatType: 'day'
      })
    }
  })

  periodReminderObservable(reminder => {
    Notification.cancelLocalNotifications({id: '2'})
    if (reminder.enabled) setupPeriodReminder()
  })

  getBleedingDaysSortedByDate().addListener(() => {
    Notification.cancelLocalNotifications({id: '2'})
    if (periodReminderObservable.value.enabled) setupPeriodReminder()
  })

}

function setupPeriodReminder() {
  const bleedingPrediction = cycleModule().getPredictedMenses()
  if (bleedingPrediction.length > 0) {
    const bleedingStart = Moment(bleedingPrediction[0][0], "YYYY-MM-DD")
    // 3 days before and at 6 am
    const reminderDate = bleedingStart
      .subtract(3, 'days')
      .hours(6)
      .minutes(0)
      .seconds(0)
    // period is likely to start in 3 to 3 + (length of prediction - 1) days
    const daysToEndOfPrediction = bleedingPrediction[0].length + 2

    Notification.localNotificationSchedule({
      id: '2',
      message: labels.periodReminder.notification(daysToEndOfPrediction),
      date: reminderDate.toDate(),
      vibrate: false
    })
  }
}