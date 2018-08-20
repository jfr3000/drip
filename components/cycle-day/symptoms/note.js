import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'

import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import ActionButtonFooter from './action-button-footer'

export default class Temp extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    const note = this.cycleDay.note
    this.makeActionButtons = props.makeActionButtons

    this.state = {
      currentValue: note && note.value || ''
    }
  }

  render() {
    return (
      <View style={styles.menuOnBottom}>
        <View style={styles.symptomViewRow}>
          <Text style={styles.symptomDayView}>Note</Text>
          <TextInput
            multiline={true}
            placeholder="Enter"
            onChangeText={(val) => {
              this.setState({ currentValue: val })
            }}
            value={this.state.currentValue}
          />
        </View>
        <ActionButtonFooter
          symptom='note'
          cycleDay={this.cycleDay}
          saveAction={() => {
            saveSymptom('note', this.cycleDay, {
              value: this.state.currentValue
            })
          }}
          saveDisabled={!this.state.currentValue}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}