import {tempReminderObservable, periodReminderObservable} from '../local-storage'
import Notification from 'react-native-push-notification'
import { LocalDate } from 'js-joda'
import Moment from 'moment'
import { settings as labels } from '../components/labels'
import { getOrCreateCycleDay } from '../db'
import cycleModule from './cycle'

export default function setupNotifications(navigate) {
  Notification.configure({
    onNotification: () => {
      const todayDateString = LocalDate.now().toString()
      const cycleDay = getOrCreateCycleDay(todayDateString)
      if (this.id === '1') {
        navigate('TemperatureEditView', { cycleDay })
      } else if (this.id === '2') {
        navigate('Home')
      } else {
        navigate('Home')
      }
    }
  })

  tempReminderObservable(reminder => {
    Notification.cancelAllLocalNotifications({id: '1'})
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
    if (reminder.enabled) {
      const bleedingPrediction = cycleModule().getPredictedMenses()
      if (bleedingPrediction.length > 0) {
        const bleedingStart = LocalDate.parse(bleedingPrediction[0][0])
        const reminderDate = bleedingStart.minusDays(3)
        // period is likely to start in 3 to 3 + (length of prediction - 1) days
        const daysToEndOfPrediction = bleedingPrediction[0].length + 2

        Notification.localNotificationSchedule({
          id: '2',
          message: labels.periodReminder.notification(daysToEndOfPrediction),
          date: reminderDate,
          vibrate: false,
          onNotification: navigate('Home')
        })
      }
    }
  })
}