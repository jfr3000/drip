import React, { Component } from 'react'
import {
  View,
  TextInput,
  Switch,
  Keyboard,
  Alert,
  ScrollView
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker-nevo'

import { getPreviousTemperature, saveSymptom } from '../../../db'
import styles from '../../../styles'
import { LocalTime, ChronoUnit } from 'js-joda'
import { temperature as labels } from '../labels'
import { scaleObservable } from '../../../local-storage'
import { shared } from '../../labels'
import ActionButtonFooter from './action-button-footer'
import config from '../../../config'
import SymptomSection from './symptom-section'

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
      outOfRange: null,
      note: temp ? temp.note : null
    }

    if (temp) {
      this.state.temperature = temp.value.toString()
      if (temp.value === Math.floor(temp.value)) {
        this.state.temperature = `${this.state.temperature}.0`
      }
    } else {
      const prevTemp = getPreviousTemperature(this.cycleDay)
      if (prevTemp) {
        this.state.temperature = prevTemp.toString()
        this.state.isSuggestion = true
      }
    }
  }

  saveTemperature = () => {
    const dataToSave = {
      value: Number(this.state.temperature),
      exclude: this.state.exclude,
      time: this.state.time,
      note: this.state.note
    }
    saveSymptom('temperature', this.cycleDay, dataToSave)
    this.props.navigate('CycleDay', {cycleDay: this.cycleDay})
  }

  checkRangeAndSave = () => {
    const value = Number(this.state.temperature)

    const absolute = {
      min: config.temperatureScale.min,
      max: config.temperatureScale.max
    }
    const scale = scaleObservable.value
    let warningMsg
    if (value < absolute.min || value > absolute.max) {
      warningMsg = labels.outOfAbsoluteRangeWarning
    } else if (value < scale.min || value > scale.max) {
      warningMsg = labels.outOfRangeWarning
    }

    if (warningMsg) {
      Alert.alert(
        shared.warning,
        warningMsg,
        [
          { text: shared.cancel },
          { text: shared.save, onPress: this.saveTemperature}
        ]
      )
    } else {
      this.saveTemperature()
    }

  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <View>
            <SymptomSection
              header="Temperature (°C)"
              explainer={labels.temperature.explainer}
              inline={true}
            >
              <TempInput
                value={this.state.temperature}
                setState={(val) => this.setState(val)}
                isSuggestion={this.state.isSuggestion}
              />
            </SymptomSection>
            <SymptomSection
              header="Time"
              inline={true}
            >
              <TextInput
                style={styles.temperatureTextInput}
                onFocus={() => {
                  Keyboard.dismiss()
                  this.setState({ isTimePickerVisible: true })
                }}
                value={this.state.time}
              />
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
            </SymptomSection>
            <SymptomSection
              header="Note"
              explainer={labels.note.explainer}
            >
              <TextInput
                multiline={true}
                autoFocus={this.state.focusTextArea}
                placeholder="Enter"
                value={this.state.note}
                onChangeText={(val) => {
                  this.setState({ note: val })
                }}
              />
            </SymptomSection>
            <SymptomSection
              header="Exclude"
              explainer={labels.excludeExplainer}
              inline={true}
            >
              <Switch
                onValueChange={(val) => {
                  this.setState({ exclude: val })
                }}
                value={this.state.exclude}
              />
            </SymptomSection>
          </View>
        </ScrollView>
        <ActionButtonFooter
          symptom='temperature'
          cycleDay={this.cycleDay}
          saveAction={() => this.checkRangeAndSave()}
          saveDisabled={
            this.state.temperature === '' ||
            isNaN(Number(this.state.temperature)) ||
            isInvalidTime(this.state.time)
          }
          navigate={this.props.navigate}
          autoShowDayView={false}
        />
      </View>
    )
  }
}

class TempInput extends Component {
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