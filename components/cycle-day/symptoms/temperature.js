import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Switch
} from 'react-native'

import { getPreviousTemperature, saveSymptom } from '../../../db'
import styles from '../../../styles'
import { LocalTime, ChronoUnit } from 'js-joda'

export default class Temp extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    let initialValue

    const temp = this.cycleDay.temperature

    if (temp) {
      initialValue = temp.value.toString()
      this.time = temp.time
    } else {
      const prevTemp = getPreviousTemperature(this.cycleDay)
      initialValue = prevTemp ? prevTemp.toString() : ''
    }

    this.state = {
      currentValue: initialValue,
      exclude: temp ? temp.exclude : false,
      time: this.time || LocalTime.now().truncatedTo(ChronoUnit.MINUTES).toString()
    }
  }

  render() {
    const cycleDay = this.cycleDay
    return (
      <View style={styles.symptomEditView}>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Temperature (°C)</Text>
          <TextInput
            style={styles.temperatureTextInput}
            placeholder="Enter"
            onChangeText={(val) => {
              this.setState({ currentValue: val })
            }}
            keyboardType='numeric'
            value={this.state.currentValue}
          />
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Time</Text>
          <TextInput
            style={styles.temperatureTextInput}
            onChangeText={(val) => {
              this.setState({ time: val })
            }}
            keyboardType='numeric'
            value={this.state.time}
          />
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Exclude</Text>
          <Switch
            onValueChange={(val) => {
              this.setState({ exclude: val })
            }}
            value={this.state.exclude}
          />
        </View>
        <View style={styles.actionButtonRow}>
          {this.makeActionButtons({
            symptom: 'temperature',
            cycleDay: this.cycleDay,
            saveAction: () => {
              const dataToSave = {
                value: Number(this.state.currentValue),
                exclude: this.state.exclude,
                time: this.state.time
              }
              if (!cycleDay.temperature || cycleDay.temperature && !cycleDay.temperature.time) {
                const now = LocalTime.now().truncatedTo(ChronoUnit.MINUTES).toString()
                dataToSave.time = now
              }
              saveSymptom('temperature', cycleDay, dataToSave)
            },
            saveDisabled: this.state.currentValue === ''
          })}
        </View>
      </View>
    )
  }
}
