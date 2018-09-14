import React, { Component } from 'react'
import {
  ScrollView,
  TextInput,
  View
} from 'react-native'
import { saveSymptom } from '../../../db'
import { pain as labels } from '../labels/labels'
import ActionButtonFooter from './action-button-footer'
import SelectBoxGroup from '../select-box-group'
import SymptomSection from './symptom-section'
import styles from '../../../styles'

const categories = labels.categories
const boxes = [{
  label: categories.cramps,
  stateKey: 'cramps'
}, {
  label: categories.ovulationPain,
  stateKey: 'ovulationPain'
}, {
  label: categories.headache,
  stateKey: 'headache'
}, {
  label: categories.backache,
  stateKey: 'backache'
}, {
  label: categories.nausea,
  stateKey: 'nausea'
}, {
  label: categories.tenderBreasts,
  stateKey: 'tenderBreasts'
}, {
  label: categories.migraine,
  stateKey: 'migraine'
}, {
  label: categories.other,
  stateKey: 'other'
}]

export default class Pain extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.state = {}
    if (this.cycleDay.pain !== null ) {
      Object.assign(this.state, this.cycleDay.pain)
      if (this.cycleDay.pain && this.cycleDay.pain.note) {
        this.state.other = true
      }
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
              data={boxes}
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
          cycleDay={this.cycleDay}
          saveAction={() => {
            const copyOfState = Object.assign({}, this.state)
            if (!copyOfState.other) {
              copyOfState.note = null
            }
            saveSymptom('pain', this.cycleDay, copyOfState)
          }}
          saveDisabled={Object.values(this.state).every(value => !value)}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
