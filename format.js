import moment from "moment"

export function formatDateForViewHeader(date) {
  return moment(date).format()
}