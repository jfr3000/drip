import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import { bleeding as labels} from './labels'
import cycleDayModule from './get-cycle-day-number'
import { bleedingDaysSortedByDate } from './db'

const getCycleDayNumber = cycleDayModule()

export default class DayView extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.showView = props.showView
    bleedingDaysSortedByDate.addListener(setStateWithCurrentCycleDayNumber.bind(this))
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeAllListeners()
  }

  render() {
    const bleedingValue = this.cycleDay.bleeding && this.cycleDay.bleeding.value
    let bleedingLabel
    if (typeof bleedingValue === 'number') {
      bleedingLabel = `Bleeding: ${labels[bleedingValue]}`
      if (this.cycleDay.bleeding.exclude) bleedingLabel += " (Excluded)"
    } else {
      bleedingLabel = null
    }
    const temperatureValue = this.cycleDay.temperature && this.cycleDay.temperature.value
    let temperatureLabel
    if (typeof temperatureValue === 'number') {
      temperatureLabel = `Temperature: ${temperatureValue}`
      if (this.cycleDay.temperature.exclude) temperatureLabel += " (Excluded)"
    } else {
      temperatureLabel = null
    }

    return (
      <View>
        <Text style={styles.welcome}>{bleedingLabel}</Text>
        <Text style={styles.welcome}>{temperatureLabel}</Text>
        <Button
          onPress={() => this.showView('bleedingEditView')}
          title="Edit bleeding">
        </Button>
        <Button
          onPress={() => this.showView('temperatureEditView')}
          title="Edit temperature">
        </Button>
      </View >
    )
  }
}

function setStateWithCurrentCycleDayNumber() {
  this.setState({
    cycleDayNumber: getCycleDayNumber(this.cycleDay.date)
  })
}