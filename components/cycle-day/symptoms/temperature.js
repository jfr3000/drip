import React from 'react'
import {
  View,
  Switch,
  Keyboard,
  Alert,
  ScrollView
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker-nevo'
import padWithZeros from '../../helpers/pad-time-with-zeros'

import { getPreviousTemperature } from '../../../db'
import styles from '../../../styles'
import { LocalTime, ChronoUnit } from 'js-joda'
import { temperature as labels } from '../../../i18n/en/cycle-day'
import { scaleObservable } from '../../../local-storage'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import ActionButtonFooter from './action-button-footer'
import config from '../../../config'
import AppTextInput from '../../app-text-input'
import AppText from '../../app-text'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

const minutes = ChronoUnit.MINUTES

export default class Temp extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.temperature = cycleDay && cycleDay.temperature

    const temp = this.temperature

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
      const prevTemp = getPreviousTemperature(props.date)
      if (prevTemp) {
        this.state.temperature = prevTemp.toString()
        this.state.isSuggestion = true
      }
    }
  }

  symptomName = 'temperature'

  onBackButtonPress() {
    if (this.state.temperature === '') {
      this.deleteSymptomEntry()
      return
    }

    this.checkRangeAndSave()
  }

  saveTemperature = () => {
    const dataToSave = {
      value: Number(this.state.temperature),
      exclude: this.state.exclude,
      time: this.state.time,
      note: this.state.note
    }

    this.saveSymptomEntry(dataToSave)
  }

  checkRangeAndSave = () => {
    const value = Number(this.state.temperature)
    const { min, max } = config.temperatureScale
    const range = { min, max }
    const scale = scaleObservable.value
    let warningMsg

    if (value < range.min || value > range.max) {
      warningMsg = labels.outOfAbsoluteRangeWarning
    } else if (value < scale.min || value > scale.max) {
      warningMsg = labels.outOfRangeWarning
    }

    if (warningMsg) {
      Alert.alert(
        sharedLabels.warning,
        warningMsg,
        [
          { text: sharedLabels.cancel },
          { text: sharedLabels.save, onPress: this.saveTemperature}
        ]
      )
    } else {
      this.saveTemperature()
    }
  }

  setTemperature = (temperature) => {
    if (isNaN(Number(temperature))) return
    this.setState({ temperature, isSuggestion: false })
  }

  setNote = (note) => {
    this.setState({ note })
  }

  showTimePicker = () => {
    Keyboard.dismiss()
    this.setState({ isTimePickerVisible: true })
  }

  render() {
    const inputStyle = [styles.temperatureTextInput]
    if (this.state.isSuggestion) {
      inputStyle.push(styles.temperatureTextInputSuggestion)
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <SymptomSection
            header={labels.temperature.header}
            explainer={labels.temperature.explainer}
          >
            <View style={styles.framedSegmentInlineChildren}>
              <AppTextInput
                style={[inputStyle]}
                autoFocus={true}
                placeholder={this.state.temperature}
                value={this.state.temperature}
                onChangeText={this.setTemperature}
                keyboardType='numeric'
                maxLength={5}
                onBlur={this.checkRange}
              />
              <AppText style={{ marginLeft: 5 }}>°C</AppText>
            </View>
          </SymptomSection>
          <SymptomSection
            header={labels.time}
          >
            <View style={styles.framedSegmentInlineChildren}>
              <AppTextInput
                style={[styles.temperatureTextInput]}
                onFocus={this.showTimePicker}
                value={this.state.time}
              />
              <DateTimePicker
                mode="time"
                isVisible={this.state.isTimePickerVisible}
                onConfirm={jsDate => {
                  this.setState({
                    time: padWithZeros(jsDate),
                    isTimePickerVisible: false
                  })
                }}
                onCancel={() => this.setState({ isTimePickerVisible: false })}
              />
            </View>
          </SymptomSection>
          <SymptomSection
            header={labels.note.header}
            explainer={labels.note.explainer}
          >
            <AppTextInput
              multiline={true}
              autoFocus={this.state.focusTextArea}
              placeholder={sharedLabels.enter}
              value={this.state.note}
              onChangeText={this.setNote}
            />
          </SymptomSection>
          <SymptomSection
            header={labels.exclude.header}
            explainer={labels.exclude.explainer}
            inline={true}
          >
            <Switch
              onValueChange={(val) => {
                this.setState({ exclude: val })
              }}
              value={this.state.exclude}
            />
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom='temperature'
          date={this.props.date}
          currentSymptomValue={this.temperature}
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

function isInvalidTime(timeString) {
  try {
    LocalTime.parse(timeString)
  } catch (err) {
    return true
  }
  return false
}