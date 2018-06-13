import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import { formatDateForViewHeader } from './format'
import { bleeding as labels} from './labels'
import getCycleDay from './get-cycle-day'

export default class DayView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDay: props.navigation.state.params.cycleDay
    }
  }

  render() {
    const navigate = this.props.navigation.navigate
    const cycleDay = this.state.cycleDay
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
        <Text>Cycle day {getCycleDay()}</Text>
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