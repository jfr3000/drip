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
    this.state = {
      currentValue: '',
      rerenderToggle: false
    }
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
            console.log(Number(this.state.currentValue))
            saveTemperature(
              new Date(),
              {
                value: Number(this.state.currentValue),
                exclude: false
              }
            )
            this.setState({currentValue: ''})
            // FlatList only reacts to primitive value changes,
            // this boolean toggle makes sure the list updates
            this.setState({ reRender: !this.state.rerenderToggle})
            Keyboard.dismiss()
          }}
          title="Save"
        />
        <FlatList
          data = { cycleDaysSortedbyTempValueView }
          renderItem={({item}) => <Text>{item.temperature.value}</Text>}
          extraData = { this.state }
        />
      </View>
    )
  }
}
