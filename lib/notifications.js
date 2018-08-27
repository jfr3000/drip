import {tempReminderObservable} from '../local-storage'
import Notification from 'react-native-push-notification'
import { LocalDate } from 'js-joda'
import Moment from 'moment'
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
      const [hours, minutes] = reminder.time.split(':')
      let target = new Moment()
        .hours(parseInt(hours))
        .minutes(parseInt(minutes))
        .seconds(0)

      if(target.isBefore(new Moment())) {
        target = target.add(1, 'd')
      }

      Notification.localNotificationSchedule({
        message: labels.tempReminder.notification,
        date: target.toDate(),
        vibrate: false,
        repeatType: 'day'
      })
    }
  })
}