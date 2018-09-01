import React, { Component } from 'react'
import {
  View,
  Switch,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import {cervix as labels} from '../labels/labels'
import ActionButtonFooter from './action-button-footer'
import SelectTabGroup from '../select-tab-group'
import { SymptomSectionHeader, AppText } from '../../app-text'

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
      {label: labels.opening.categories[0], value: 0},
      {label: labels.opening.categories[1], value: 1},
      {label: labels.opening.categories[2], value: 2}
    ]
    const cervixFirmnessRadioProps = [
      {label: labels.firmness.categories[0], value: 0 },
      {label: labels.firmness.categories[1], value: 1 }
    ]
    const cervixPositionRadioProps = [
      {label: labels.position.categories[0], value: 0 },
      {label: labels.position.categories[1], value: 1 },
      { label: labels.position.categories[2], value: 2 }
    ]
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <View>
            <SymptomSectionHeader>Opening</SymptomSectionHeader>
            <AppText>{labels.opening.explainer}</AppText>
            <SelectTabGroup
              buttons={cervixOpeningRadioProps}
              active={this.state.opening}
              onSelect={val => this.setState({ opening: val })}
            />
            <SymptomSectionHeader>Firmness</SymptomSectionHeader>
            <AppText>{labels.firmness.explainer}</AppText>
            <SelectTabGroup
              buttons={cervixFirmnessRadioProps}
              active={this.state.firmness}
              onSelect={val => this.setState({ firmness: val })}
            />
            <SymptomSectionHeader>Position</SymptomSectionHeader>
            <AppText>{labels.position.explainer}</AppText>
            <SelectTabGroup
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
