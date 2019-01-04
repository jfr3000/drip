import { LocalDate } from 'js-joda'
import moment from 'moment'

export default function (date) {
  const today = LocalDate.now()
  const dateToDisplay = LocalDate.parse(date)
  const formattedDate = today.equals(dateToDisplay) ? 'today' : moment(date).format('MMMM Do YYYY')
  return formattedDate.toLowerCase()
}
