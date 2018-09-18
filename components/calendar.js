import React, { Component } from 'react'
import { CalendarList } from 'react-native-calendars'
import {LocalDate} from 'js-joda'
import { getOrCreateCycleDay, getBleedingDaysSortedByDate } from '../db'
import cycleModule from '../lib/cycle'
import {shadesOfRed} from '../styles/index'
import styles from '../styles/index'


export default class CalendarView extends Component {
  constructor(props) {
    super(props)
    this.bleedingDays = getBleedingDaysSortedByDate()
    const predictedMenses = cycleModule().getPredictedMenses()
    this.state = {
      bleedingDaysInCalFormat: toCalFormat(this.bleedingDays),
      predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses),
      todayInCalFormat: todayToCalFormat()
    }

    this.bleedingDays.addListener(this.setStateWithCalFormattedDays)
  }

  setStateWithCalFormattedDays = () => {
    const predictedMenses = cycleModule().getPredictedMenses()
    this.setState({
      bleedingDaysInCalFormat: toCalFormat(this.bleedingDays),
      predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses),
      todayInCalFormat: todayToCalFormat()
    })
  }

  componentWillUnmount() {
    this.bleedingDays.removeListener(this.setStateWithCalFormattedDays)
  }

  passDateToDayView = (result) => {
    const cycleDay = getOrCreateCycleDay(result.dateString)
    const navigate = this.props.navigate
    navigate('CycleDay', { cycleDay })
  }
  render() {
    return (
      <CalendarList
        onDayPress={this.passDateToDayView.bind(this)}
        markedDates={
          Object.assign(
            {},
            this.state.todayInCalFormat,
            this.state.bleedingDaysInCalFormat,
            this.state.predictedBleedingDaysInCalFormat
          )
        }
        markingType={'custom'}
      />
    )
  }
}

function toCalFormat(bleedingDaysSortedByDate) {
  const todayDateString = LocalDate.now().toString()
  return bleedingDaysSortedByDate.reduce((acc, day) => {
    acc[day.date] = {
      customStyles: {
        container: {
          backgroundColor: shadesOfRed[day.bleeding.value],
        }
      }
    }
    if (day.date === todayDateString) {
      acc[day.date].customStyles.text = styles.calendarToday
    }
    return acc
  }, {})
}

function predictionToCalFormat(predictedDays) {
  if (!predictedDays.length) return {}
  const todayDateString = LocalDate.now().toString()
  const middleIndex = (predictedDays[0].length - 1) / 2
  return predictedDays.reduce((acc, setOfDays) => {
    setOfDays.reduce((accSet, day, i) => {
      accSet[day] = {
        customStyles: {
          container: {
            borderColor: (i === middleIndex) ? shadesOfRed[3] : shadesOfRed[2],
            borderWidth: 3,
          },
          text: {
            marginTop: 1,
          }
        }
      }
      if (day === todayDateString) {
        accSet[day].customStyles.text = Object.assign(
          {},
          styles.calendarToday,
          {marginTop: -2}
        )
      }
      return accSet
    }, acc)
    return acc
  }, {})
}

function todayToCalFormat() {
  const todayDateString = LocalDate.now().toString()
  const todayFormated = {}
  todayFormated[todayDateString] = {
    customStyles: {
      text: styles.calendarToday
    }
  }
  return todayFormated
}