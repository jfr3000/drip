import React, { Component } from 'react'
import { TextInput } from 'react-native'

import SymptomSection from './symptom-section'
import { noteExplainer } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import SymptomView from './symptom-view'

import { saveSymptom } from '../../../db'

class Note extends Component {
  constructor(props) {
    super(props)
    const symptom = 'note'
    const { cycleDay } = props

    const defaultSymptomData = { value: '' }

    const symptomData =
      cycleDay && cycleDay[symptom] ? cycleDay[symptom] : defaultSymptomData

    this.state = { ...symptomData }

    this.symptom = symptom
  }

  autoSave = () => {
    const { date } = this.props
    const valuesToSave = { ...this.state }
    saveSymptom(this.symptom, date, this.state.value ? valuesToSave : null)
  }

  componentDidUpdate() {
    this.autoSave()
  }

  render() {
    return (
      <SymptomView
        symptom={this.symptom}
        values={this.state}
        date={this.props.date}
      >
        <SymptomSection
          explainer={noteExplainer}
        >
          <TextInput
            autoFocus={true}
            multiline={true}
            placeholder={sharedLabels.enter}
            onChangeText={(val) => {
              this.setState({ value: val })
            }}
            value={this.state.value}
            testID='noteInput'
          />
        </SymptomSection>
      </SymptomView>
    )
  }
}

export default Note
