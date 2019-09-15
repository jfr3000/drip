import React, { Component } from 'react'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'

import { LocalTime, ChronoUnit } from 'js-joda'
import { temperature as labels } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'

import AppTextInput from '../../app-text-input'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'
import TimeInput from './time-input'
import TemperatureInput from './temperature-input'

import { saveSymptom } from '../../../db'

const minutes = ChronoUnit.MINUTES

class Temperature extends Component {

  static propTypes = {
    cycleDay: PropTypes.object,
    handleBackButtonPress: PropTypes.func,
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    const symptom = 'temperature'
    const { cycleDay } = props

    const defaultSymptomData = {
      time: LocalTime.now().truncatedTo(minutes).toString(),
      temperature: null,
      note: '',
      exclude: false
    }

    const symptomData =
      cycleDay && cycleDay[symptom] ? cycleDay[symptom] : defaultSymptomData

    const { value, ...restSymptomData } = symptomData
    this.state = { temperature: value, ...restSymptomData }

    this.symptom = symptom
  }

  isDeleteIconActive() {
    return ['temperature', 'note', 'exclude'].some(key => {
    // the time is always and the suggested temp sometimes prefilled, so they're not relevant for setting
    // the delete button active.
      return this.state[key] || this.state[key] === 0
    })
  }

  autoSave = () => {
    const { date } = this.props
    const { temperature, exclude, time, note } = this.state

    const valuesToSave = {
      value: temperature,
      exclude,
      time,
      note
    }

    saveSymptom(this.symptom, date, temperature ? valuesToSave : null)
  }

  setTime = (time) => {
    this.setState({ time })
  }

  setTemperature = (temperature) => {
    this.setState({ temperature })
  }

  setNote = (note) => {
    this.setState({ note })
  }

  componentDidUpdate() {
    this.autoSave()
  }

  render() {
    const { temperature } = this.state

    return (
      <SymptomView
        symptom={'temperature'}
        values={this.state}
        handleBackButtonPress={this.props.handleBackButtonPress}
        date={this.props.date}
      >
        <SymptomSection
          header={labels.temperature.header}
          explainer={labels.temperature.explainer}
        >
          <TemperatureInput
            temperature={temperature ? temperature.toFixed(2) : ''}
            date={this.props.date}
            handleTemperatureChange={this.setTemperature}
          />
        </SymptomSection>
        <SymptomSection header={labels.time}>
          <TimeInput
            time={this.state.time}
            handleTimeChange={this.setTime}
          />
        </SymptomSection>
        <SymptomSection
          header={labels.note.header}
          explainer={labels.note.explainer}
        >
          <AppTextInput
            multiline={true}
            placeholder={sharedLabels.enter}
            value={this.state.note}
            onChangeText={this.setNote}
            testID='noteInput'
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
      </SymptomView>
    )
  }
}

export default Temperature
