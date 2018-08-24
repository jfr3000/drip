import React, { Component } from 'react'
import {
  CheckBox,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import {
  pain as painLabels
} from '../labels/labels'
import ActionButtonFooter from './action-button-footer'

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

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>PAIN</Text>
              <Text style={styles.symptomDayView}>{painLabels.cramps}</Text>
              <CheckBox
                value={this.state.cramps}
                onValueChange={(val) => {
                  this.setState({cramps: val})
                }}
              />
              <Text style={styles.symptomDayView}>
                {painLabels.ovulationPain}
              </Text>
              <CheckBox
                value={this.state.ovulationPain}
                onValueChange={(val) => {
                  this.setState({ovulationPain: val})
                }}
              />
            </View>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>
                {painLabels.headache}
              </Text>
              <CheckBox
                value={this.state.headache}
                onValueChange={(val) => {
                  this.setState({headache: val})
                }}
              />
              <Text style={styles.symptomDayView}>
                {painLabels.backache}
              </Text>
              <CheckBox
                value={this.state.backache}
                onValueChange={(val) => {
                  this.setState({backache: val})
                }}
              />
            </View>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>
                {painLabels.nausea}
              </Text>
              <CheckBox
                value={this.state.nausea}
                onValueChange={(val) => {
                  this.setState({nausea: val})
                }}
              />
              <Text style={styles.symptomDayView}>
                {painLabels.tenderBreasts}
              </Text>
              <CheckBox
                value={this.state.tenderBreasts}
                onValueChange={(val) => {
                  this.setState({tenderBreasts: val})
                }}
              />
            </View>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>
                {painLabels.migraine}
              </Text>
              <CheckBox
                value={this.state.migraine}
                onValueChange={(val) => {
                  this.setState({migraine: val})
                }}
              />
              <Text style={styles.symptomDayView}>
                {painLabels.other}
              </Text>
              <CheckBox
                value={this.state.other}
                onValueChange={(val) => {
                  this.setState({
                    other: val,
                    focusTextArea: true
                  })
                }}
              />
            </View>
            <View style={styles.symptomViewRowInline}>
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
