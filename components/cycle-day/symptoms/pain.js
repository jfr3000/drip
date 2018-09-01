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

const boxes = [{
  label: labels.cramps,
  stateKey: 'cramps'
}, {
  label: labels.ovulationPain,
  stateKey: 'ovulationPain'
}, {
  label: labels.headache,
  stateKey: 'headache'
}, {
  label: labels.backache,
  stateKey: 'backache'
}, {
  label: labels.nausea,
  stateKey: 'nausea'
}, {
  label: labels.tenderBreasts,
  stateKey: 'tenderBreasts'
}, {
  label: labels.migraine,
  stateKey: 'migraine'
}, {
  label: labels.other,
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
        <ScrollView>
          <View>
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
          </View>
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
