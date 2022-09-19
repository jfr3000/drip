import { LocalDate } from '@js-joda/core'
import moment from 'moment'

import { general as labels } from '../../i18n/en/cycle-day'

export default function (date) {
  const today = LocalDate.now()
  const dateToDisplay = LocalDate.parse(date)
  return today.equals(dateToDisplay)
    ? labels.today
    : moment(date).format('MMMM Do YYYY')
}

export function formatDateForShortText(date) {
  return moment(date.toString()).format('dddd, MMMM Do')
}

export function dateToTitle(dateString) {
  const today = LocalDate.now()
  const dateToDisplay = LocalDate.parse(dateString)
  return today.equals(dateToDisplay)
    ? labels.today
    : moment(dateString).format('ddd DD. MMM YY')
}

export function humanizeDate(dateString) {
  if (!dateString) return ''

  const today = LocalDate.now()

  try {
    const dateToDisplay = LocalDate.parse(dateString)
    return today.equals(dateToDisplay)
      ? labels.today
      : moment(dateString).format('DD. MMM YY')
  } catch (e) {
    return ''
  }
}
