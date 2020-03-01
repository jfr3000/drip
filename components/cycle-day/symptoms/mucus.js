import React, { Component } from 'react'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'

import { mucus as labels } from '../../../i18n/en/cycle-day'
import computeNfpValue from '../../../lib/nfp-mucus'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

import { getLabelsList } from '../../helpers/labels'
import { saveSymptom } from '../../../db'

class Mucus extends Component {

  static propTypes = {
    cycleDay: PropTypes.object,
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    const symptom = 'mucus'
    const { cycleDay } = props

    const defaultSymptomData = {}

    const symptomData =
      cycleDay && cycleDay[symptom] ? cycleDay[symptom] : defaultSymptomData

    this.state = { ...symptomData }

    this.mucusFeeling = getLabelsList(labels.feeling.categories)
    this.mucusTexture = getLabelsList(labels.texture.categories)

    this.symptom = symptom
  }

  shouldAutoSave = () => {
    const { date } = this.props
    const nothingEntered = ['feeling', 'texture'].every(
      val => typeof this.state[val] !== 'number'
    )
    const { feeling, texture, exclude} = this.state
    const valuesToSave = {
      feeling,
      texture,
      value: computeNfpValue(feeling, texture),
      exclude: Boolean(exclude)
    }
    saveSymptom(this.symptom, date, nothingEntered ? null : valuesToSave)
  }

  componentDidUpdate() {
    this.shouldAutoSave()
  }

  render() {
    // TODO leaving this info for notice when leaving incomplete data
    // const mandatoryNotCompletedYet = typeof this.state.feeling != 'number' || typeof this.state.texture != 'number'
    return (
      <SymptomView
        symptom={this.symptom}
        values={this.state}
        date={this.props.date}
      >
        <SymptomSection
          header='Feeling'
          explainer={labels.feeling.explainer}
        >
          <SelectTabGroup
            buttons={this.mucusFeeling}
            onSelect={val => this.setState({ feeling: val })}
            active={this.state.feeling}
          />
        </SymptomSection>
        <SymptomSection
          header='Texture'
          explainer={labels.texture.explainer}
        >
          <SelectTabGroup
            buttons={this.mucusTexture}
            onSelect={val => this.setState({ texture: val })}
            active={this.state.texture}
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
      </SymptomView>
    )
  }
}

export default Mucus
