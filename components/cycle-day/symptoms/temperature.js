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
      integer: '',
      fractional: '',
      outOfRange: null
    }

    if (temp) {
      const [integer, fractional] = temp.value.toString().split('.')
      this.state.integer = integer
      this.state.fractional = fractional || '0'
    } else {
      const prevTemp = getPreviousTemperature(this.cycleDay)
      if (prevTemp) {
        const [integer, fractional] = prevTemp.toString().split('.')
        this.state.integer = integer
        this.state.fractional = fractional
        this.state.isSuggestion = true
      }
    }
  }

  render() {
    return (
      <View style={styles.symptomEditView}>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Temperature (°C)</Text>
          <TempInputPair
            integer={this.state.integer}
            fractional={this.state.fractional}
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
              time: `${jsDate.getinteger()}:${jsDate.getfractional()}`,
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
              const v = Number(`${this.state.integer}.${this.state.fractional}`)
              const dataToSave = {
                value: v,
                exclude: this.state.exclude,
                time: this.state.time
              }
              saveSymptom('temperature', this.cycleDay, dataToSave)
            },
            saveDisabled:
              this.state.integer === '' ||
              isNaN(Number(this.state.integer)) ||
              isNaN(Number(this.state.fractional)) ||
              isInvalidTime(this.state.time)
          })}
        </View>
      </View>
    )
  }
}

class TempInputPair extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TempInput
          type='integer'
          integer={this.props.integer}
          fractional={this.props.fractional}
          setState={this.props.setState}
          isSuggestion={this.props.isSuggestion}
        />
        <Text style={styles.temperatureTextInput}>.</Text>
        <TempInput
          type='fractional'
          integer={this.props.integer}
          fractional={this.props.fractional}
          setState={this.props.setState}
          isSuggestion={this.props.isSuggestion}
        />
      </View>
    )
  }
}
class TempInput extends Component {
  checkRange = () => {
    const value = Number(`${this.props.integer}.${this.props.fractional}`)
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
          this.props.setState({ [this.props.type]: val, isSuggestion: false })
        }}
        keyboardType='numeric'
        value={this.props[this.props.type]}
        onBlur={this.checkRange}
        maxLength={2}
        autoFocus={this.props.type === 'fractional'}
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