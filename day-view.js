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

const getCycleDay = cycleDayModule(bleedingDaysSortedByDate)

export default class DayView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDay: props.navigation.state.params.cycleDay
    }
  }

  render() {
    const navigate = this.props.navigation.navigate
    const day = this.state.cycleDay
    const bleedingValue = day.bleeding && day.bleeding.value
    let bleedingLabel
    if (typeof bleedingValue === 'number') {
      bleedingLabel = `Bleeding: ${labels[bleedingValue]}`
    } else {
      bleedingLabel = ''
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(day.date)}</Text>
        <Text>Cycle day {getCycleDay(day.date)}</Text>
        <Text style={styles.welcome}>{bleedingLabel}</Text>
        <Button
          onPress={() => navigate('bleeding', { cycleDay: day })}
          title="Edit bleeding">
        </Button>
      </View >
    )
  }
}