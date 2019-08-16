import React, { Component } from 'react'
import { Switch } from 'react-native'
import PropTypes from 'prop-types'

import { cervix as labels } from '../../../i18n/en/cycle-day'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

import { getLabelsList } from '../../helpers/labels'
import { saveSymptom } from '../../../db'

class Cervix extends Component {

  static propTypes = {
    cycleDay: PropTypes.object,
    handleBackButtonPress: PropTypes.func,
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    const symptom = 'cervix'
    const { cycleDay } = props

    const defaultSymptomData = {}

    const symptomData =
      cycleDay && cycleDay[symptom] ? cycleDay[symptom] : defaultSymptomData

    this.state = { ...symptomData }

    this.cervixOpeningRadioProps = getLabelsList(labels.opening.categories)
    this.cervixFirmnessRadioProps = getLabelsList(labels.firmness.categories)
    this.cervixPositionRadioProps = getLabelsList(labels.position.categories)

    this.symptom = symptom
  }

  autoSave = () => {
    const { date } = this.props
    const { opening, firmness, position, exclude } = this.state
    const valuesToSave = {
      opening,
      firmness,
      position,
      exclude: Boolean(exclude)
    }
    const nothingEntered = ['opening', 'firmness', 'position'].every(
      val => typeof this.state[val] !== 'number')
    saveSymptom(this.symptom, date, nothingEntered ? null : valuesToSave)
  }

  componentDidUpdate() {
    this.autoSave()
  }

  render() {
    // TODO saving this info for notice when leaving incomplete data
    // const mandatoryNotCompleted = typeof this.state.opening != 'number' || typeof this.state.firmness != 'number'
    return (
      <SymptomView
        symptom={this.symptom}
        values={this.state}
        handleBackButtonPress={this.props.handleBackButtonPress}
        date={this.props.date}
      >
        <SymptomSection
          header="Opening"
          explainer={labels.opening.explainer}
        >
          <SelectTabGroup
            buttons={this.cervixOpeningRadioProps}
            active={this.state.opening}
            onSelect={val => this.setState({ opening: val })}
          />
        </SymptomSection>
        <SymptomSection
          header="Firmness"
          explainer={labels.firmness.explainer}
        >
          <SelectTabGroup
            buttons={this.cervixFirmnessRadioProps}
            active={this.state.firmness}
            onSelect={val => this.setState({ firmness: val })}
          />
        </SymptomSection>
        <SymptomSection
          header="Position"
          explainer={labels.position.explainer}
        >
          <SelectTabGroup
            buttons={this.cervixPositionRadioProps}
            active={this.state.position}
            onSelect={val => this.setState({ position: val })}
          />
        </SymptomSection>
        <SymptomSection
          header="Exclude"
          explainer="You can exclude this value if you don't want to use it for fertility detection"
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

export default Cervix
