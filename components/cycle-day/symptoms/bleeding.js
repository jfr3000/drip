import React, { Component } from 'react'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'

import { bleeding } from '../../../i18n/en/cycle-day'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

import { getLabelsList } from '../../helpers/labels'
import { saveSymptom } from '../../../db'

class Bleeding extends Component {

  static propTypes = {
    cycleDay: PropTypes.object,
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    const symptom = 'bleeding'
    const { cycleDay } = props

    const defaultSymptomData = {
      value: null,
      exclude: false
    }

    const symptomData =
      cycleDay && cycleDay[symptom] ? cycleDay[symptom] : defaultSymptomData

    this.state = { ...symptomData }

    this.bleedingRadioProps = getLabelsList(bleeding.labels)

    this.symptom = symptom
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
          header={bleeding.heaviness.header}
          explainer={bleeding.heaviness.explainer}
        >
          <SelectTabGroup
            buttons={this.bleedingRadioProps}
            active={this.state.value}
            onSelect={val => this.setState({ value: val })}
          />
        </SymptomSection>
        <SymptomSection
          header={bleeding.exclude.header}
          explainer={bleeding.exclude.explainer}
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

export default Bleeding
