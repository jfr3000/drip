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
        this.state.suggestedTemperature = prevTemp.toString()
        this.state.isSuggestion = true
      }
    }
  }

  symptomName = 'temperature'

  isDeleteIconActive() {
    return ['temperature', 'note', 'exclude'].some(key => {
    // the time is always and the suggested temp sometimes prefilled, so they're not relevant for setting
    // the delete button active.
      return this.state[key] || this.state[key] === 0
    })
  }

  autoSave = () => {
    if (typeof this.state.temperature != 'string' || this.state.temperature === '') {
      this.deleteSymptomEntry()
      return
    }

    const dataToSave = {
      value: Number(this.state.temperature),
      exclude: this.state.exclude,
      time: this.state.time,
      note: this.state.note
    }

    this.saveSymptomEntry(dataToSave)
  }

  warnUserIfTempOutOfRange = async () => {
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

    // RN alert runs asynchronously but doesn't provide a callback, so wrap
    // it in a promise
    return new Promise(resolve => {
      if (warningMsg) {
        // we set this so the time picker doesn't open at the same time
        this.warningAlertOpen = true
        Alert.alert(
          sharedLabels.warning,
          warningMsg,
          [
            { text: sharedLabels.ok, onPress: () => {
              this.warningAlertOpen = false
            }}
          ]
        )
      } else {
        resolve(true)
      }
    })
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

  renderContent() {
    const inputStyle = [styles.temperatureTextInput]
    if (this.state.isSuggestion) {
      inputStyle.push(styles.temperatureTextInputSuggestion)
    }
    return (
      <ScrollView style={styles.page}>
        <SymptomSection
          header={labels.temperature.header}
          explainer={labels.temperature.explainer}
        >
          <View style={styles.framedSegmentInlineChildren}>
            <AppTextInput
              style={[inputStyle]}
              autoFocus={true}
              value={this.state.temperature || this.state.suggestedTemperature}
              onChangeText={this.setTemperature}
              keyboardType='numeric'
              maxLength={5}
              onBlur={this.warnUserIfTempOutOfRange}
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
              onFocus={() => {
                if (this.warningAlertOpen) {
                  Keyboard.dismiss()
                } else {
                  this.showTimePicker()
                }
              }}
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
    )
  }
}
