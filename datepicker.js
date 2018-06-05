import React, { Component } from 'react'
import {
  View, Button, DatePickerAndroid
} from 'react-native'
import * as styles from './styles'
import { getOrCreateCycleDay } from './db'

export default class DatePickView extends Component {
  constructor(props) {
    super(props)
  }

  async pickDate() {
    const result = await DatePickerAndroid.open({
      date: new Date()
    })
    if (result.action !== DatePickerAndroid.dismissedAction) {
      const date = new Date(result.year, result.month, result.day)
      const cycleDay = getOrCreateCycleDay(date)
      const navigate = this.props.navigation.navigate
      navigate('dayView', { cycleDay })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={ this.pickDate.bind(this) } title="pick a date" />
      </View>
    )
  }
}

