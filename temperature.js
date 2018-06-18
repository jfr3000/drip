import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  Switch
} from 'react-native'

import { saveTemperature, getPreviousTemperature } from './db'
import styles from './styles'

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
      <View style={ styles.symptomEditView }>
        <View style={ styles.symptomEditSplitSymptomsAndLastRowButtons }>
          <View style={ styles.itemsInRowView }>
            <View style={{flex: 3, margin: 5}}>
              <Text style={styles.symptomDayView}>Temperature (°C)</Text>
            </View>
            <View style={{flex: 1, margin: 5}}>
              <TextInput
                placeholder="Enter"
                onChangeText={(val) => {
                  this.setState({currentValue: val})
                }}
                keyboardType='numeric'
                value = {this.state.currentValue}
              />
            </View>
          </View>
          <View style={ styles.itemsInRowSeparatedView }>
            <View style={{flex: 1, margin: 5}}>
              <Text style={styles.symptomDayView}>Exclude</Text>
            </View>
            <View style={{flex: 1, margin: 5}}>
              <Switch
                onValueChange = {(val) => {
                  this.setState({ exclude: val })
                }}
                value = { this.state.exclude }
              />
            </View>
          </View>
        </View>
        <View style={ styles.itemsInRowSeparatedView }>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => {
                this.showView('dayView')
              }}
              title="Cancel">
            </Button>
          </View>
          <View style={ styles.singleButtonView }>
            <Button
              onPress={() => {
                saveTemperature(cycleDay)
                this.showView('dayView')
              }}
              title="Delete">
            </Button>
          </View>
          <View style={ styles.singleButtonView }>
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
        </View>
      </View>
    )
  }
}
