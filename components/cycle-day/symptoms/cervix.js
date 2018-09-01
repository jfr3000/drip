import React, { Component } from 'react'
import {
  View,
  Switch,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import {
  cervixOpening as openingLabels,
  cervixFirmness as firmnessLabels,
  cervixPosition as positionLabels
} from '../labels/labels'
import ActionButtonFooter from './action-button-footer'
import RadioButtonGroup from '../radio-button-group'
import { SymptomSectionHeader } from '../../app-text'

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
        <ScrollView style={styles.page}>
          <View>
            <SymptomSectionHeader>Opening</SymptomSectionHeader>
            <RadioButtonGroup
              buttons={cervixOpeningRadioProps}
              active={this.state.opening}
              onSelect={val => this.setState({ opening: val })}
            />
            <SymptomSectionHeader>Firmness</SymptomSectionHeader>
            <RadioButtonGroup
              buttons={cervixFirmnessRadioProps}
              active={this.state.firmness}
              onSelect={val => this.setState({ firmness: val })}
            />
            <SymptomSectionHeader>Position</SymptomSectionHeader>
            <RadioButtonGroup
              buttons={cervixPositionRadioProps}
              active={this.state.position}
              onSelect={val => this.setState({ position: val })}
            />
            <View style={styles.symptomViewRowInline}>
              <SymptomSectionHeader>Exclude</SymptomSectionHeader>
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
