import React, { Component } from 'react'
import {
  View,
  Text,
  Switch
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import { bleeding as labels } from '../labels/labels'

export default class Bleeding extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    let bleedingValue = this.cycleDay.bleeding && this.cycleDay.bleeding.value
    if (!(typeof bleedingValue === 'number')) {
      bleedingValue = -1
    }
    this.state = {
      currentValue: bleedingValue,
      exclude: this.cycleDay.bleeding ? this.cycleDay.bleeding.exclude : false
    }
  }

  render() {
    const bleedingRadioProps = [
      { label: labels[0], value: 0 },
      { label: labels[1], value: 1 },
      { label: labels[2], value: 2 },
      { label: labels[3], value: 3 },
    ]
    return (
      <View style={styles.symptomEditView}>
        <Text style={styles.symptomDayView}>Bleeding</Text>
        <View style={styles.radioButtonRow}>
          <RadioForm
            radio_props={bleedingRadioProps}
            initial={this.state.currentValue}
            formHorizontal={true}
            labelHorizontal={false}
            labelStyle={styles.radioButton}
            onPress={(itemValue) => {
              this.setState({ currentValue: itemValue })
            }}
          />
        </View>
        <View style={styles.symptomViewRowInline}>
          <Text style={styles.symptomDayView}>Exclude</Text>
          <Switch
            onValueChange={(val) => {
              this.setState({ exclude: val })
            }}
            value={this.state.exclude}
          />
        </View>
        <View style={styles.actionButtonRow}>
          {this.makeActionButtons(
            {
              symptom: 'bleeding',
              cycleDay: this.cycleDay,
              saveAction: () => {
                saveSymptom('bleeding', this.cycleDay, {
                  value: this.state.currentValue,
                  exclude: this.state.exclude
                })
              },
              saveDisabled: this.state.currentValue === -1
            }
          )}
        </View>
      </View>
    )
  }
}