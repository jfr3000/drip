import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { intensity, desire } from '../../../i18n/en/cycle-day'
import ActionButtonFooter from './action-button-footer'
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
    if (!this.state.currentValue) {
      this.deleteSymptomEntry()
      return
    }
    this.saveSymptomEntry({ value: this.state.currentValue })
  }

  render() {
    const desireRadioProps = [
      { label: intensity[0], value: 0 },
      { label: intensity[1], value: 1 },
      { label: intensity[2], value: 2 }
    ]
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
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
        </ScrollView>
        <ActionButtonFooter
          symptom='desire'
          date={this.props.date}
          currentSymptomValue={this.desire}
          saveDisabled={typeof this.state.currentValue != 'number'}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
