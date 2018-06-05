import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  Picker
} from 'react-native'
import styles from './styles'
import { saveBleeding } from './db'
import { formatDateForViewHeader } from './format'

export default class Bleeding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cycleDay: props.navigation.state.params.cycleDay,
      currentValue: null
    }
  }

  // TODO display cycle day
  render() {
    const navigate = this.props.navigation.navigate
    const day = this.state.cycleDay
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(day.date)}</Text>
        <Picker
          selectedValue={this.state.currentValue}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => {
            this.setState({ currentValue: itemValue })
          }}>
          <Picker.Item label="spotting" value="1" />
          <Picker.Item label="light" value="2" />
          <Picker.Item label="medium" value="3" />
          <Picker.Item label="heavy" value="4" />
        </Picker>
        <Button
          onPress={() => {
            saveBleeding(day, {
              value: Number(this.state.currentValue),
              exclude: false
            })
            navigate('dayView', { cycleDay: day })
          }}
          title="Save">
        </Button>
      </View>
    )
  }
}