import React from 'react'
import {
  View,
  Switch,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { cervix as labels } from '../../../i18n/en/cycle-day'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

export default class Cervix extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.cervix = cycleDay && cycleDay.cervix
    this.state = this.cervix ? this.cervix : {}
  }

  symptomName = 'cervix'

  onBackButtonPress() {
    const nothingEntered = ['opening', 'firmness', 'position'].every(val => typeof this.state[val] != 'number')
    if (nothingEntered) {
      this.deleteSymptomEntry()
      return
    }

    this.saveSymptomEntry({
      opening: this.state.opening,
      firmness: this.state.firmness,
      position: this.state.position,
      exclude: Boolean(this.state.exclude)
    })
  }

  render() {
    const cervixOpeningRadioProps = [
      { label: labels.opening.categories[0], value: 0 },
      { label: labels.opening.categories[1], value: 1 },
      { label: labels.opening.categories[2], value: 2 }
    ]
    const cervixFirmnessRadioProps = [
      { label: labels.firmness.categories[0], value: 0 },
      { label: labels.firmness.categories[1], value: 1 }
    ]
    const cervixPositionRadioProps = [
      { label: labels.position.categories[0], value: 0 },
      { label: labels.position.categories[1], value: 1 },
      { label: labels.position.categories[2], value: 2 }
    ]
    const mandatoryNotCompleted = typeof this.state.opening != 'number' || typeof this.state.firmness != 'number'
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <SymptomSection
            header="Opening"
            explainer={labels.opening.explainer}
          >
            <SelectTabGroup
              buttons={cervixOpeningRadioProps}
              active={this.state.opening}
              onSelect={val => this.setState({ opening: val })}
            />
          </SymptomSection>
          <SymptomSection
            header="Firmness"
            explainer={labels.firmness.explainer}
          >
            <SelectTabGroup
              buttons={cervixFirmnessRadioProps}
              active={this.state.firmness}
              onSelect={val => this.setState({ firmness: val })}
            />
          </SymptomSection>
          <SymptomSection
            header="Position"
            explainer={labels.position.explainer}
          >
            <SelectTabGroup
              buttons={cervixPositionRadioProps}
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
        </ScrollView>
      </View>
    )
  }
}
