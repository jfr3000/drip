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
import { sex as sexLabels } from '../labels/labels'
import ActionButtonFooter from './action-button-footer'

export default class Sex extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.state = {}
    if (this.cycleDay.sex !== null) {
      Object.assign(this.state, this.cycleDay.sex)
      // We make sure other is always true when there is a note,
      // e.g. when import is messed up.
      if (this.cycleDay.sex && this.cycleDay.sex.note) {
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
              <Text style={styles.symptomDayView}>{sexLabels.solo}</Text>
              <CheckBox
                value={this.state.solo}
                onValueChange={(val) => {
                  this.setState({ solo: val })
                }}
              />
              <Text style={styles.symptomDayView}>
                {sexLabels.partner}
              </Text>
              <CheckBox
                value={this.state.partner}
                onValueChange={(val) => {
                  this.setState({ partner: val })
                }}
              />
            </View>
            <Text style={styles.symptomDayView}>CONTRACEPTIVES</Text>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>
                {sexLabels.condom}
              </Text>
              <CheckBox
                value={this.state.condom}
                onValueChange={(val) => {
                  this.setState({ condom: val })
                }}
              />
              <Text style={styles.symptomDayView}>
                {sexLabels.pill}
              </Text>
              <CheckBox
                value={this.state.pill}
                onValueChange={(val) => {
                  this.setState({ pill: val })
                }}
              />
            </View>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>
                {sexLabels.iud}
              </Text>
              <CheckBox
                value={this.state.iud}
                onValueChange={(val) => {
                  this.setState({ iud: val })
                }}
              />
              <Text style={styles.symptomDayView}>
                {sexLabels.patch}
              </Text>
              <CheckBox
                value={this.state.patch}
                onValueChange={(val) => {
                  this.setState({ patch: val })
                }}
              />
            </View>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>
                {sexLabels.ring}
              </Text>
              <CheckBox
                value={this.state.ring}
                onValueChange={(val) => {
                  this.setState({ ring: val })
                }}
              />
              <Text style={styles.symptomDayView}>
                {sexLabels.implant}
              </Text>
              <CheckBox
                value={this.state.implant}
                onValueChange={(val) => {
                  this.setState({ implant: val })
                }}
              />
            </View>
            <View style={styles.symptomViewRowInline}>
              <Text style={styles.symptomDayView}>
                {sexLabels.other}
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
            {this.state.other &&
              <TextInput
                autoFocus={this.state.focusTextArea}
                multiline={true}
                placeholder="Enter"
                value={this.state.note}
                onChangeText={(val) => {
                  this.setState({ note: val })
                }}
              />
            }
          </View>
        </ScrollView>
        <ActionButtonFooter
          symptom='sex'
          cycleDay={this.cycleDay}
          saveAction={() => {
            const copyOfState = Object.assign({}, this.state)
            if (!copyOfState.other) {
              copyOfState.note = null
            }
            saveSymptom('sex', this.cycleDay, copyOfState)
          }}
          saveDisabled={Object.values(this.state).every(value => !value)}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
