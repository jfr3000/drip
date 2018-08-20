import React, { Component } from 'react'
import {
  View,
  Text,
  Switch,
  ScrollView
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import {
  cervixOpening as openingLabels,
  cervixFirmness as firmnessLabels,
  cervixPosition as positionLabels
} from '../labels/labels'
import ActionButtonFooter from './action-button-footer'

export default class Cervix extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    this.state = {
      exclude: this.cycleDay.cervix ? this.cycleDay.cervix.exclude : false
    };

    /* eslint-disable react/no-direct-mutation-state */
    ['opening', 'firmness', 'position'].forEach(label => {
      this.state[label] = this.cycleDay.cervix && this.cycleDay.cervix[label]
      if (typeof this.state[label] !== 'number') {
        this.state[label] = -1
      }
    })
    /* eslint-enable react/no-direct-mutation-state */
  }

  render() {
    const cervixOpeningRadioProps = [
      {label: openingLabels[0], value: 0},
      {label: openingLabels[1], value: 1},
      {label: openingLabels[2], value: 2}
    ]
    const cervixFirmnessRadioProps = [
      {label: firmnessLabels[0], value: 0 },
      {label: firmnessLabels[1], value: 1 }
    ]
    const cervixPositionRadioProps = [
      {label: positionLabels[0], value: 0 },
      {label: positionLabels[1], value: 1 },
      { label: positionLabels[2], value: 2 }
    ]
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <Text style={styles.symptomDayView}>Opening</Text>
            <View style={styles.radioButtonRow}>
              <RadioForm
                radio_props={cervixOpeningRadioProps}
                initial={this.state.opening}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({ opening: itemValue })
                }}
              />
            </View>
            <Text style={styles.symptomDayView}>Firmness</Text>
            <View style={styles.radioButtonRow}>
              <RadioForm
                radio_props={cervixFirmnessRadioProps}
                initial={this.state.firmness}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({ firmness: itemValue })
                }}
              />
            </View>
            <Text style={styles.symptomDayView}>Position</Text>
            <View style={styles.radioButtonRow}>
              <RadioForm
                radio_props={cervixPositionRadioProps}
                initial={this.state.position}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({ position: itemValue })
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
          </View>
        </ScrollView>
        <ActionButtonFooter
          symptom='cervix'
          cycleDay={this.cycleDay}
          saveAction={() => {
            saveSymptom('cervix', this.cycleDay, {
              opening: this.state.opening,
              firmness: this.state.firmness,
              position: this.state.position,
              exclude: this.state.exclude
            })
          }}
          saveDisabled={this.state.opening === -1 || this.state.firmness === -1}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
