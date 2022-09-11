import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { CalendarList } from 'react-native-calendars'

import { getBleedingDaysSortedByDate } from '../db'
import cycleModule from '../lib/cycle'
import {
  calendarTheme,
  predictionToCalFormat,
  toCalFormat,
  todayToCalFormat,
} from './helpers/calendar'

const CalendarView = ({ setDate, navigate }) => {
  const bleedingDays = getBleedingDaysSortedByDate()
  const predictedMenses = cycleModule().getPredictedMenses()

  const passDateToDayView = ({ dateString }) => {
    setDate(dateString)
    navigate('CycleDay')
  }

  const markedDates = Object.assign(
    {},
    todayToCalFormat(),
    toCalFormat(bleedingDays),
    predictionToCalFormat(predictedMenses)
  )

  return (
    <View style={styles.container}>
      <CalendarList
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        onDayPress={passDateToDayView}
        markedDates={markedDates}
        markingType="custom"
        theme={calendarTheme}
        // Max amount of months allowed to scroll to the past.
        pastScrollRange={120}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

CalendarView.propTypes = {
  setDate: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
}

export default CalendarView
