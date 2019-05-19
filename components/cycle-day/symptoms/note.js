import React from 'react'
import {
  ScrollView,
  TextInput,
  View
} from 'react-native'

import { noteExplainer } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import styles from '../../../styles'

import SymptomSection from './symptom-section'
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
        <View style={{ flexDirection: 'row' }}>
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
        </View>
      </ScrollView>
    )
  }
}
