import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import { formatDateForViewHeader } from './format'

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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(day.date)}</Text>
        <Text style={styles.welcome}>{day.bleeding && day.bleeding.value}</Text>
        <Button
          onPress={() => navigate('bleeding', { cycleDay: day })}
          title="Edit bleeding">
        </Button>
      </View >
    )
  }
}