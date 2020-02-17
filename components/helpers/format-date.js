import { LocalDate } from 'js-joda'
import moment from 'moment'

export default function (date) {
  const today = LocalDate.now()
  const dateToDisplay = LocalDate.parse(date)
  return today.equals(dateToDisplay) ?
    'today' :
    moment(date).format('MMMM Do YYYY')
}

export function formatDateForShortText (date) {
  return moment(date.toString()).format('dddd, MMMM Do')
}