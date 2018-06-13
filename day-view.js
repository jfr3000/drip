import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import { formatDateForViewHeader } from './format'
import { bleeding as labels} from './labels'
import cycleDayModule from './get-cycle-day-number'
import { bleedingDaysSortedByDate } from './db'

const getCycleDayNumber = cycleDayModule()

export default class DayView extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.navigation.state.params.cycleDay
    this.state = {
      cycleDayNumber: getCycleDayNumber(this.cycleDay.date),
    }
    bleedingDaysSortedByDate.addListener(setStateWithCurrentCycleDayNumber.bind(this))
  }

  componentWillUnmount() {
    bleedingDaysSortedByDate.removeAllListeners()
  }

  render() {
    const navigate = this.props.navigation.navigate
    const cycleDay = this.cycleDay
    const bleedingValue = cycleDay.bleeding && cycleDay.bleeding.value
    let bleedingLabel
    if (typeof bleedingValue === 'number') {
      bleedingLabel = `Bleeding: ${labels[bleedingValue]}`
      if (cycleDay.bleeding.exclude) bleedingLabel += " (Excluded)"
    } else {
      bleedingLabel = null
    }
    const temperatureValue = cycleDay.temperature && cycleDay.temperature.value
    let temperatureLabel
    if (typeof temperatureValue === 'number') {
      temperatureLabel = `Temperature: ${temperatureValue}`
      if (cycleDay.temperature.exclude) temperatureLabel += " (Excluded)"
    } else {
      temperatureLabel = null
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(cycleDay.date)}</Text>
        <Text>Cycle day {getCycleDayNumber(cycleDay.date)}</Text>
        <Text style={styles.welcome}>{bleedingLabel}</Text>
        <Text style={styles.welcome}>{temperatureLabel}</Text>
        <Button
          onPress={() => navigate('bleeding', { cycleDay })}
          title="Edit bleeding">
        </Button>
        <Button
          onPress={() => navigate('temperature', { cycleDay })}
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