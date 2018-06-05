import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'
import { formatDateForViewHeader } from './format'
import { bleeding as labels} from './labels'

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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(day.date)}</Text>
        <Text style={styles.welcome}>{bleedingValue != undefined ? labels[bleedingValue] : ''}</Text>
        <Button
          onPress={() => navigate('bleeding', { cycleDay: day })}
          title="Edit bleeding">
        </Button>
      </View >
    )
  }
}