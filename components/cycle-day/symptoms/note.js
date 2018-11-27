import React, { Component } from 'react'
import {
  View,
  ScrollView,
  TextInput,
} from 'react-native'

import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import ActionButtonFooter from './action-button-footer'
import SymptomSection from './symptom-section'
import { noteExplainer } from '../labels'

export default class Note extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.note = cycleDay && cycleDay.note
    this.makeActionButtons = props.makeActionButtons

    this.state = {
      currentValue: this.note && this.note.value || ''
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <SymptomSection
            explainer={noteExplainer}
          >
            <TextInput
              autoFocus={!this.state.currentValue}
              multiline={true}
              placeholder="Enter"
              onChangeText={(val) => {
                this.setState({ currentValue: val })
              }}
              value={this.state.currentValue}
            />
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom='note'
          date={this.props.date}
          currentSymptomValue={this.note}
          saveAction={() => {
            saveSymptom('note', this.props.date, {
              value: this.state.currentValue
            })
          }}
          saveDisabled={!this.state.currentValue}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
