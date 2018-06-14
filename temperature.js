import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  Switch
} from 'react-native'

import { saveTemperature, getPreviousTemperature } from './db'

export default class Temp extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.showView = props.showView
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
    const cycleDay = this.cycleDay
    return (
      <View>
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
            this.showView('dayView')
          }}
          title="Cancel">
        </Button>
        <Button
          onPress={() => {
            saveTemperature(cycleDay)
            this.showView('dayView')
          }}
          title="Delete entry">
        </Button>
        <Button
          onPress={() => {
            saveTemperature(cycleDay, {
              value: Number(this.state.currentValue),
              exclude: this.state.exclude
            })
            this.showView('dayView')
          }}
          disabled={ this.state.currentValue === '' }
          title="Save">
        </Button>
      </View>
    )
  }
}
