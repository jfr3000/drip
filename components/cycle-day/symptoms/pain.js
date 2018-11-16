import React, { Component } from 'react'
import {
  ScrollView,
  TextInput,
  View
} from 'react-native'
import { saveSymptom } from '../../../db'
import { pain as labels } from '../labels'
import ActionButtonFooter from './action-button-footer'
import SelectBoxGroup from '../select-box-group'
import SymptomSection from './symptom-section'
import styles from '../../../styles'

export default class Pain extends Component {
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
                placeholder="Enter"
                value={this.state.note}
                onChangeText={(val) => {
                  this.setState({note: val})
                }}
              />
            }
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom='pain'
          date={this.props.date}
          currentSymptomValue={this.state}
          saveAction={() => {
            const copyOfState = Object.assign({}, this.state)
            if (!copyOfState.other) {
              copyOfState.note = null
            }
            saveSymptom('pain', this.props.date, copyOfState)
          }}
          saveDisabled={Object.values(this.state).every(value => !value)}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
