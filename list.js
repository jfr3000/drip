import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Keyboard
} from 'react-native'

import * as styles from './styles'
import { cycleDaysSortedbyTempValueView, saveTemperature } from './db'

export default class Temp extends Component {
  constructor(props) {
    super(props)
    this.state = { currentValue: '' }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter your temperature"
          onChangeText={(val) => {
            this.setState({currentValue: val})
          }}
          keyboardType='numeric'
          value = {this.state.currentValue}
        />
        <Button
          onPress={() => {
            saveTemperature(
              new Date(),
              {
                value: Number(this.state.currentValue),
                exclude: false
              }
            )
            this.setState({currentValue: ''})
            Keyboard.dismiss()
          }}
          title="Save"
        />
        <FlatList
          data = { cycleDaysSortedbyTempValueView }
          renderItem={({item}) => <Text>{item.temperature.value}</Text>}
        />
      </View>
    )
  }
}
