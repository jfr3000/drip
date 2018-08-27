import {tempReminderObservable} from '../local-storage'
import { LocalTime, ChronoUnit } from 'js-joda'
import {NotificationsAndroid} from 'react-native-notifications'

let stopCheckingTheTime = () => {}

export default function setupNotifications() {
  tempReminderObservable(reminder => {
    stopCheckingTheTime()
    if (reminder.enabled) {
      stopCheckingTheTime = notifyAt(reminder.time)
    }
  })
}

function notifyAt(time) {
  const id = setInterval(() => {
    const now = LocalTime.now().truncatedTo(ChronoUnit.MINUTES).toString()
    if (now === time) {
      NotificationsAndroid.localNotification({
        title: 'yo',
        body: 'much notification'
      })
    }
  }, 60 * 1000)
  return () => clearInterval(id)
}