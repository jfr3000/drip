import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { CalendarList } from 'react-native-calendars'

import { connect } from 'react-redux'
import { setDate } from '../slices/date'
import { navigate } from '../slices/navigation'

import { getBleedingDaysSortedByDate } from '../db'
import cycleModule from '../lib/cycle'
import nothingChanged from '../db/db-unchanged'
import {
  calendarTheme,
  predictionToCalFormat,
  toCalFormat,
  todayToCalFormat,
} from './helpers/calendar'

class CalendarView extends Component {
  static propTypes = {
    setDate: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.bleedingDays = getBleedingDaysSortedByDate()
    const predictedMenses = cycleModule().getPredictedMenses()
    this.state = {
      bleedingDaysInCalFormat: toCalFormat(this.bleedingDays),
      predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses),
      todayInCalFormat: todayToCalFormat(),
    }

    this.bleedingDays.addListener(this.setStateWithCalFormattedDays)
  }

  setStateWithCalFormattedDays = (_, changes) => {
    if (nothingChanged(changes)) return
    const predictedMenses = cycleModule().getPredictedMenses()
    this.setState({
      bleedingDaysInCalFormat: toCalFormat(this.bleedingDays),
      predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses),
      todayInCalFormat: todayToCalFormat(),
    })
  }

  componentWillUnmount() {
    this.bleedingDays.removeListener(this.setStateWithCalFormattedDays)
  }

  passDateToDayView = (result) => {
    this.props.setDate(result.dateString)
    this.props.navigate('CycleDay')
  }

  render() {
    const {
      todayInCalFormat,
      bleedingDaysInCalFormat,
      predictedBleedingDaysInCalFormat,
    } = this.state
    const markedDates = Object.assign(
      {},
      todayInCalFormat,
      bleedingDaysInCalFormat,
      predictedBleedingDaysInCalFormat
    )

    return (
      <View style={styles.container}>
        <CalendarList
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          onDayPress={this.passDateToDayView.bind(this)}
          markedDates={markedDates}
          markingType="custom"
          theme={calendarTheme}
          // Max amount of months allowed to scroll to the past.
          pastScrollRange={120}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

const mapDispatchToProps = (dispatch) => {
  return {
    setDate: (date) => dispatch(setDate(date)),
    navigate: (page) => dispatch(navigate(page)),
  }
}

export default connect(null, mapDispatchToProps)(CalendarView)
