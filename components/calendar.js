import React, { Component } from 'react'
import { CalendarList } from 'react-native-calendars'
import { getOrCreateCycleDay, bleedingDaysSortedByDate } from '../db'
import cycleModule from '../lib/cycle'

export default class CalendarView extends Component {
  constructor(props) {
    super(props)
    const predictedMenses = cycleModule().getPredictedMenses()
    this.state = {
      bleedingDaysInCalFormat: toCalFormat(bleedingDaysSortedByDate),
      predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses)
    }

    this.setStateWithCalFormattedDays = (function (CalendarComponent) {
      return function() {
        const predictedMenses = cycleModule().getPredictedMenses()
        CalendarComponent.setState({
          bleedingDaysInCalFormat: toCalFormat(bleedingDaysSortedByDate),
          predictedBleedingDaysInCalFormat: predictionToCalFormat(predictedMenses)
        })
      }
    })(this)

    bleedingDaysSortedByDate.addListener(this.setStateWithCalFormattedDays)
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeListener(this.setStateWithCalFormattedDays)
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
            this.state.bleedingDaysInCalFormat,
            this.state.predictedBleedingDaysInCalFormat
          )
        }
        markingType={'period'}
      />
    )
  }
}

function toCalFormat(bleedingDaysSortedByDate) {
  const shadesOfRed = ['#ffbaba', '#ff7b7b', '#ff5252', '#ff0000']
  return bleedingDaysSortedByDate.reduce((acc, day) => {
    acc[day.date] = {
      startingDay: true,
      endingDay: true,
      color: shadesOfRed[day.bleeding.value]
    }
    return acc
  }, {})
}

function predictionToCalFormat(predictedDays) {
  if (!predictedDays.length) return {}
  const shadesOfGrey = ['#e5e5e5', '#cccccc'] // [lighter, darker]
  const middleIndex = (predictedDays[0].length - 1) / 2
  return predictedDays.reduce((acc, setOfDays) => {
    setOfDays.reduce((accSet, day, i) => {
      accSet[day] = {
        startingDay: true,
        endingDay: true,
        color: (i === middleIndex) ? shadesOfGrey[1] : shadesOfGrey[0]
      }
      return accSet
    }, acc)
    return acc
  }, {})
}