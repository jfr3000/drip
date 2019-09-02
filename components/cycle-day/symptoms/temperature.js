import React from 'react'
import { Switch, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getDate } from '../../../slices/date'

import styles from '../../../styles'
import { LocalTime, ChronoUnit } from 'js-joda'
import { temperature as labels } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'

import AppTextInput from '../../app-text-input'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'
import TimeInput from './time-input'
import TemperatureInput from './temperature-input'

const minutes = ChronoUnit.MINUTES

class Temperature extends SymptomView {

  static propTypes = {
    cycleDay: PropTypes.object,
    handleBackButtonPress: PropTypes.func,
    date: PropTypes.string,
  }

  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.temperature = cycleDay && cycleDay.temperature

    const temp = this.temperature

    this.state = {
      exclude: temp ? temp.exclude : false,
      time: temp ? temp.time : LocalTime.now().truncatedTo(minutes).toString(),
      temperature: temp ? temp.value : null,
      note: temp ? temp.note : null
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
    if (!this.state.temperature) {
      this.deleteSymptomEntry()
      return
    }

    const dataToSave = {
      value: this.state.temperature,
      exclude: this.state.exclude,
      time: this.state.time,
      note: this.state.note
    }

    this.saveSymptomEntry(dataToSave)
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

  renderContent() {
    const { temperature } = this.state

    return (
      <ScrollView style={styles.page}>
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
            autoFocus={this.state.focusTextArea}
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
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state)
  })
}

export default connect(
  mapStateToProps,
  null
)(Temperature)
