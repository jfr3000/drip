import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { intensity, desire } from '../../../i18n/en/cycle-day'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

import { getLabelsList } from '../../helpers/labels'
import { saveSymptom } from '../../../db'

class Desire extends Component {

  static propTypes = {
    cycleDay: PropTypes.object,
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    const symptom = 'desire'
    const { cycleDay } = props

    const defaultSymptomData = { value: '' }

    const symptomData =
      cycleDay && cycleDay[symptom] ? cycleDay[symptom] : defaultSymptomData

    this.state = { ...symptomData }

    this.symptom = symptom

    this.desireRadioProps = getLabelsList(intensity)
  }

  autoSave = () => {
    const { date } = this.props
    const valuesToSave = { ...this.state }
    const hasValueToSave = typeof this.state.value === 'number'
    saveSymptom(this.symptom, date, hasValueToSave ? valuesToSave : null)
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
          header={desire.header}
          explainer={desire.explainer}
        >
          <SelectTabGroup
            buttons={this.desireRadioProps}
            active={this.state.value}
            onSelect={val => this.setState({ value: val })}
          />
        </SymptomSection>
      </SymptomView>
    )
  }
}

export default Desire
