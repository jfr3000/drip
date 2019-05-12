import React from 'react'
import {
  TextInput,
  View,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { sex as sexLabels, contraceptives as contraceptivesLabels } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import ActionButtonFooter from './action-button-footer'
import SelectBoxGroup from '../select-box-group'
import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

export default class Sex extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    if (cycleDay && cycleDay.sex) {
      this.state = Object.assign({}, cycleDay.sex)
    } else {
      this.state = {}
    }
    // We make sure other is always true when there is a note,
    // e.g. when import is messed up.
    if (this.state.note) this.state.other = true
  }

  symptomName = "sex"

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
            header={sexLabels.header}
            explainer={sexLabels.explainer}
          >
            <SelectBoxGroup
              labels={sexLabels.categories}
              onSelect={this.toggleState}
              optionsState={this.state}
            />
          </SymptomSection>
          <SymptomSection
            header={contraceptivesLabels.header}
            explainer={contraceptivesLabels.explainer}
          >
            <SelectBoxGroup
              labels={contraceptivesLabels.categories}
              onSelect={this.toggleState}
              optionsState={this.state}
            />
          </SymptomSection>

          {this.state.other &&
            <TextInput
              autoFocus={this.state.focusTextArea}
              multiline={true}
              placeholder={sharedLabels.enter}
              value={this.state.note}
              onChangeText={(val) => {
                this.setState({ note: val })
              }}
            />
          }
        </ScrollView>
        <ActionButtonFooter
          symptom='sex'
          date={this.props.date}
          currentSymptomValue={this.state}
          saveDisabled={Object.values(this.state).every(value => !value)}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
