import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Switch,
  Keyboard,
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker-nevo'

import { getPreviousTemperature, saveSymptom } from '../../../db'
import styles from '../../../styles'
import { LocalTime, ChronoUnit } from 'js-joda'
import ActionButtonFooter from './action-button-footer'

const MINUTES = ChronoUnit.MINUTES

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
      time: this.time || LocalTime.now().truncatedTo(MINUTES).toString(),
      isTimePickerVisible: false
    }
  }

  render() {
    return (
      <View style={styles.menuOnBottom}>
        <View>
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
              onFocus={() => {
                Keyboard.dismiss()
                this.setState({ isTimePickerVisible: true })
              }}
              value={this.state.time}
            />
          </View>
          <DateTimePicker
            mode="time"
            isVisible={this.state.isTimePickerVisible}
            onConfirm={jsDate => {
              this.setState({
                time: `${jsDate.getHours()}:${jsDate.getMinutes()}`,
                isTimePickerVisible: false
              })
            }}
            onCancel={() => this.setState({ isTimePickerVisible: false })}
          />
          <View style={styles.symptomViewRowInline}>
            <Text style={styles.symptomDayView}>Exclude</Text>
            <Switch
              onValueChange={(val) => {
                this.setState({ exclude: val })
              }}
              value={this.state.exclude}
            />
          </View>
        </View>
        <ActionButtonFooter
          symptom='temperature'
          cycleDay={this.cycleDay}
          saveAction={() => {
            const dataToSave = {
              value: Number(this.state.currentValue),
              exclude: this.state.exclude,
              time: this.state.time
            }
            saveSymptom('temperature', this.props.cycleDay, dataToSave)
          }}
          saveDisabled={this.state.currentValue === '' || isInvalidTime(this.state.time)}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}

function isInvalidTime(timeString) {
  try {
    LocalTime.parse(timeString)
  } catch (err) {
    return true
  }
  return false
}