import React from 'react'
import {
  Switch,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { bleeding } from '../../../i18n/en/cycle-day'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

export default class Bleeding extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.bleeding = cycleDay && cycleDay.bleeding
    this.state = {
      currentValue: this.bleeding && this.bleeding.value,
      exclude: this.bleeding ? this.bleeding.exclude : false
    }
  }

  symptomName = 'bleeding'

  autoSave = () => {
    if (typeof this.state.currentValue != 'number') {
      this.deleteSymptomEntry()
      return
    }
    this.saveSymptomEntry({
      value: this.state.currentValue,
      exclude: this.state.exclude
    })
  }

  renderContent() {
    const bleedingRadioProps = [
      { label: bleeding.labels[0], value: 0 },
      { label: bleeding.labels[1], value: 1 },
      { label: bleeding.labels[2], value: 2 },
      { label: bleeding.labels[3], value: 3 },
    ]
    return (
      <ScrollView style={styles.page}>
        <SymptomSection
          header={bleeding.heaviness.header}
          explainer={bleeding.heaviness.explainer}
        >
          <SelectTabGroup
            buttons={bleedingRadioProps}
            active={this.state.currentValue}
            onSelect={val => this.setState({ currentValue: val })}
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
      </ScrollView>
    )
  }
}