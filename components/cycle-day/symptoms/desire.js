import React from 'react'
import {
  ScrollView,
  View
} from 'react-native'

import { intensity, desire } from '../../../i18n/en/cycle-day'
import styles from '../../../styles'

import SelectTabGroup from '../select-tab-group'

import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

export default class Desire extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.desire = cycleDay && cycleDay.desire
    const desireValue = this.desire && this.desire.value
    this.state = { currentValue: desireValue }
  }

  symptomName = 'desire'

  onBackButtonPress() {
    if (typeof this.state.currentValue != 'number') {
      this.deleteSymptomEntry()
      return
    }
    this.saveSymptomEntry({ value: this.state.currentValue })
  }

  renderContent() {
    const desireRadioProps = [
      { label: intensity[0], value: 0 },
      { label: intensity[1], value: 1 },
      { label: intensity[2], value: 2 }
    ]
    return (
      <ScrollView style={styles.page}>
        <View style={{ flexDirection: 'row' }}>
          <SymptomSection
            header={desire.header}
            explainer={desire.explainer}
          >
            <SelectTabGroup
              buttons={desireRadioProps}
              active={this.state.currentValue}
              onSelect={val => this.setState({ currentValue: val })}
            />
          </SymptomSection>
        </View>
      </ScrollView>
    )
  }
}
