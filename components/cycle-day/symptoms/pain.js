import React from 'react'
import {
  ScrollView,
  TextInput,
  View
} from 'react-native'
import { pain as labels } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import SelectBoxGroup from '../select-box-group'
import SymptomSection from './symptom-section'
import styles from '../../../styles'
import SymptomView from './symptom-view'

export default class Pain extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    if (cycleDay && cycleDay.pain) {
      this.state = Object.assign({}, cycleDay.pain)
    } else {
      this.state = {}
    }
    if (this.state.note) {
      this.state.other = true
    }
  }

  symptomName = 'pain'

  onBackButtonPress() {
    const nothingEntered = Object.values(this.state).every(val => !val)
    if (nothingEntered) {
      this.deleteSymptomEntry()
      return
    }

    const copyOfState = Object.assign({}, this.state)
    if (!copyOfState.other) {
      copyOfState.note = null
    }
    this.saveSymptomEntry(copyOfState)
  }

  toggleState = (key) => {
    const curr = this.state[key]
    this.setState({[key]: !curr})
    if (key === 'other' && !curr) {
      this.setState({focusTextArea: true})
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <SymptomSection
            explainer={labels.explainer}
          >
            <SelectBoxGroup
              labels={labels.categories}
              onSelect={this.toggleState}
              optionsState={this.state}
            />
            { this.state.other &&
              <TextInput
                autoFocus={this.state.focusTextArea}
                multiline={true}
                placeholder={sharedLabels.enter}
                value={this.state.note}
                onChangeText={(val) => {
                  this.setState({note: val})
                }}
              />
            }
          </SymptomSection>
        </ScrollView>
      </View>
    )
  }
}
