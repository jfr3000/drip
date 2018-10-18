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
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    const desireValue = this.cycleDay.desire && this.cycleDay.desire.value
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
          cycleDay={this.cycleDay}
          saveAction={() => {
            saveSymptom('desire', this.cycleDay, { value: this.state.currentValue })
          }}
          saveDisabled={typeof this.state.currentValue != 'number'}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
