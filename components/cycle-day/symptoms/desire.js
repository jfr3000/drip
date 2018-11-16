import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import { intensity, desire } from '../labels'
import ActionButtonFooter from './action-button-footer'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'

export default class Desire extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.desire = cycleDay && cycleDay.desire
    this.makeActionButtons = props.makeActionButtons
    const desireValue = this.desire && this.desire.value
    this.state = { currentValue: desireValue }
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
          saveAction={() => {
            saveSymptom('desire', this.props.date, { value: this.state.currentValue })
          }}
          saveDisabled={typeof this.state.currentValue != 'number'}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
