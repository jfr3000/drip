import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Switch,
  Keyboard,
  Alert
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker-nevo'

import { getPreviousTemperature, saveSymptom } from '../../../db'
import styles from '../../../styles'
import { LocalTime, ChronoUnit } from 'js-joda'
import { temperature as tempLabels } from '../labels/labels'
import { scaleObservable } from '../../../local-storage'
import { shared } from '../../labels'

const minutes = ChronoUnit.MINUTES

export default class Temp extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons

    const temp = this.cycleDay.temperature

    this.state = {
      exclude: temp ? temp.exclude : false,
      time: temp ? temp.time : LocalTime.now().truncatedTo(minutes).toString(),
      isTimePickerVisible: false,
      outOfRange: null
    }

    if (temp) {
      this.state.temperature = temp.value.toString()
      if (temp.value === Math.floor(temp.value)) {
        this.state.temperature = `${this.state.temperature}.0`
      }
    } else {
      const prevTemp = getPreviousTemperature(this.cycleDay)
      console.log(prevTemp)
      if (prevTemp) {
        this.state.temperature = prevTemp.toString()
        this.state.isSuggestion = true
      }
    }
  }

  render() {
    return (
      <View style={styles.symptomEditView}>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Temperature (°C)</Text>
          <TempInput
            value={this.state.temperature}
            setState={(val) => this.setState(val)}
            isSuggestion={this.state.isSuggestion}
          />
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Time</Text>
          <TextInput
            style={styles.temperatureTextInput}
            onFocus={() => {
              Keyboard.dismiss()
              this.setState({isTimePickerVisible: true})
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
          onCancel={() => this.setState({isTimePickerVisible: false})}
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
        <View style={styles.actionButtonRow}>
          {this.makeActionButtons({
            symptom: 'temperature',
            cycleDay: this.cycleDay,
            saveAction: async () => {
              const dataToSave = {
                value: Number(this.state.temperature),
                exclude: this.state.exclude,
                time: this.state.time
              }
              saveSymptom('temperature', this.cycleDay, dataToSave)
            },
            saveDisabled:
              this.state.temperature === '' ||
              isNaN(Number(this.state.temperature)) ||
              isInvalidTime(this.state.time)
          })}
        </View>
      </View>
    )
  }
}

class TempInput extends Component {
  checkRange = () => {
    const value = Number(this.props.value)
    console.log(value)
    if (isNaN(value)) return
    const scale = scaleObservable.value
    if (value < scale.min || value > scale.max) {
      Alert.alert(
        shared.warning,
        tempLabels.outOfRangeWarning,
      )
    }
  }

  render() {
    const style = [styles.temperatureTextInput]
    if (this.props.isSuggestion) {
      style.push(styles.temperatureTextInputSuggestion)
    }
    return (
      <TextInput
        style={style}
        onChangeText={(val) => {
          if (isNaN(Number(val))) return
          this.props.setState({ temperature: val, isSuggestion: false })
        }}
        keyboardType='numeric'
        value={this.props.value}
        onBlur={this.checkRange}
        autoFocus={true}
      />
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