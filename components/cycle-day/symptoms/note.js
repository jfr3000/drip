import React from 'react'
import {
  View,
  ScrollView,
  TextInput,
} from 'react-native'

import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import ActionButtonFooter from './action-button-footer'
import SymptomSection from './symptom-section'
import { noteExplainer } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import SymptomView from './symptom-view'

export default class Note extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.note = cycleDay && cycleDay.note

    this.state = {
      currentValue: this.note && this.note.value || ''
    }
  }

  save() {
    saveSymptom('note', this.props.date, {
      value: this.state.currentValue
    })
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
              placeholder={sharedLabels.enter}
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
          saveDisabled={!this.state.currentValue}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
