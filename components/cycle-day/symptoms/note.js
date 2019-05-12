import React from 'react'
import {
  View,
  ScrollView,
  TextInput,
} from 'react-native'

import styles from '../../../styles'
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

  symptomName = 'note'

  onBackButtonPress() {
    if (!this.state.currentValue) {
      this.deleteSymptomEntry()
      return
    }
    this.saveSymptomEntry({
      value: this.state.currentValue
    })
  }

  renderContent() {
    return (
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
    )
  }
}
