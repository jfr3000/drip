import React, { Component } from 'react'
import {
  CheckBox,
  Text,
  View
} from 'react-native'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import {
  pain as painLabels
} from '../labels/labels'

export default class Pain extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.state = {}
    if (this.cycleDay.pain !== null ) {
      Object.assign(this.state, this.cycleDay.pain)
    }
  }

  render() {

    return (
      <View style={styles.symptomEditView}>
        <Text style={styles.symptomDayView}>PAIN</Text>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>{painLabels.cramps}</Text>
          <CheckBox
            value={this.state.cramps}
            onValueChange={(val) => {
              this.setState({cramps: val})
            }}
          />
          <Text style={styles.symptomDayView}>{painLabels.ovulationPain}</Text>
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
        </View>
        <View style={styles.actionButtonRow}>
          {this.props.makeActionButtons(
            {
              symptom: 'pain',
              cycleDay: this.cycleDay,
              saveAction: () => {
                const copyOfState = Object.assign({}, this.state)
                saveSymptom('pain', this.cycleDay, copyOfState)
              },
              saveDisabled: Object.values(this.state).every(value => !value)
            }
          )}
        </View>
      </View>
    )
  }
}
