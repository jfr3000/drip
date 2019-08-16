import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { mood as labels } from '../../../i18n/en/cycle-day'
import SelectBoxGroup from '../select-box-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

import { saveSymptom } from '../../../db'

class Mood extends Component {

  static propTypes = {
    cycleDay: PropTypes.object,
    handleBackButtonPress: PropTypes.func,
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    const symptom = 'mood'
    const { cycleDay } = props

    const defaultSymptomData = {}

    const symptomData =
      cycleDay && cycleDay[symptom] ? cycleDay[symptom] : defaultSymptomData

    this.state = { ...symptomData }

    // We make sure other is always true when there is a note,
    // e.g. when import is messed up.
    if (this.state.note) this.state.other = true

    this.symptom = symptom
  }

  autoSave = () => {
    const { date } = this.props
    const valuesToSave = Object.assign({}, this.state)
    if (!valuesToSave.other) {
      valuesToSave.note = null
    }
    const nothingEntered = Object.values(this.state).every(val => !val)

    saveSymptom(this.symptom, date, nothingEntered ? null : valuesToSave)
  }

  componentDidUpdate() {
    this.autoSave()
  }

  toggleState = (key) => {
    const curr = this.state[key]
    this.setState({[key]: !curr})
    if (key === 'other' && !curr) {
      this.setState({focusTextArea: true})
    }
  }

  render() {
    return (
      <SymptomView
        symptom={this.symptom}
        values={this.state}
        handleBackButtonPress={this.props.handleBackButtonPress}
        date={this.props.date}
      >
        <SymptomSection
          explainer={labels.explainer}
        >
          <SelectBoxGroup
            labels={labels.categories}
            onSelect={this.toggleState}
            optionsState={this.state}
          />
          { this.state.other &&
              <TextInput
                autoFocus={this.state.focusTextArea}
                multiline={true}
                placeholder="Enter"
                value={this.state.note}
                onChangeText={(val) => {
                  this.setState({note: val})
                }}
              />
          }
        </SymptomSection>
      </SymptomView>
    )
  }
}

export default Mood
