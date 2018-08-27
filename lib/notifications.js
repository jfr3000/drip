import {tempReminderObservable} from '../local-storage'
import Notification from 'react-native-push-notification'
import { LocalDate } from 'js-joda'
import { settings as labels } from '../components/labels'
import { getOrCreateCycleDay } from '../db'

export default function setupNotifications(navigate) {
  Notification.configure({
    onNotification: () => {
      const todayDateString = LocalDate.now().toString()
      const cycleDay = getOrCreateCycleDay(todayDateString)
      navigate('TemperatureEditView', { cycleDay })
    }
  })

  tempReminderObservable(reminder => {
    Notification.cancelAllLocalNotifications()
    if (reminder.enabled) {
      const date = new Date()
      const [hours, minutes] = reminder.time.split(':')
      date.setHours(parseInt(hours))
      date.setMinutes(parseInt(minutes))
      date.setSeconds(0)
      Notification.localNotificationSchedule({
        message: labels.tempReminder.notification,
        date,
        vibrate: false,
        repeatType: 'day'
      })
    }
  })
}