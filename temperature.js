import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  Switch
} from 'react-native'

import styles from './styles'
import { saveTemperature, getPreviousTemperature } from './db'
import { formatDateForViewHeader } from './format'
import getCycleDay from './get-cycle-day'

export default class Temp extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.navigation.state.params.cycleDay
    let initialValue

    if(this.cycleDay.temperature) {
      initialValue = this.cycleDay.temperature.value.toString()
    } else {
      const prevTemp = getPreviousTemperature(this.cycleDay)
      initialValue = prevTemp ? prevTemp.toString() : ''
    }

    this.state = {
      currentValue: initialValue,
      exclude: this.cycleDay.temperature ? this.cycleDay.temperature.exclude : false
    }
  }

  render() {
    const navigate = this.props.navigation.navigate
    const cycleDay = this.cycleDay
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{formatDateForViewHeader(cycleDay.date)}</Text>
        <Text>Cycle day {getCycleDay()}</Text>
        <Text>Temperature</Text>
        <TextInput
          placeholder="Enter temperature"
          onChangeText={(val) => {
            this.setState({currentValue: val})
          }}
          keyboardType='numeric'
          value = {this.state.currentValue}
        />
        <Text>Exclude</Text>
        <Switch
          onValueChange = {(val) => {
            this.setState({ exclude: val })
          }}
          value = { this.state.exclude }
        />
        <Button
          onPress={() => {
            navigate('dayView', { cycleDay })
          }}
          title="Cancel">
        </Button>
        <Button
          onPress={() => {
            saveTemperature(cycleDay)
            navigate('dayView', { cycleDay })
          }}
          title="Delete entry">
        </Button>
        <Button
          onPress={() => {
            saveTemperature(cycleDay, {
              value: Number(this.state.currentValue),
              exclude: this.state.exclude
            })
            navigate('dayView', { cycleDay })
          }}
          disabled={ this.state.currentValue === '' }
          title="Save">
        </Button>
      </View>
    )
  }
}
