import React, { Component } from 'react'
import {
  View,
  Switch,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import { bleeding as labels } from '../labels'
import ActionButtonFooter from './action-button-footer'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'

export default class Bleeding extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    this.state = {
      currentValue: this.cycleDay.bleeding && this.cycleDay.bleeding.value,
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
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <SymptomSection
            header="Heaviness"
            explainer="How heavy is the bleeding?"
          >
            <SelectTabGroup
              buttons={bleedingRadioProps}
              active={this.state.currentValue}
              onSelect={val => this.setState({ currentValue: val })}
            />
          </SymptomSection>
          <SymptomSection
            header="Exclude"
            explainer="You can exclude this value if it's not menstrual bleeding"
            inline={true}
          >
            <Switch
              onValueChange={(val) => {
                this.setState({ exclude: val })
              }}
              value={this.state.exclude}
            />
          </SymptomSection>
        </ScrollView>
        <ActionButtonFooter
          symptom='bleeding'
          cycleDay={this.props.cycleDay}
          saveAction={() => {
            saveSymptom('bleeding', this.props.cycleDay, {
              value: this.state.currentValue,
              exclude: this.state.exclude
            })
          }}
          saveDisabled={typeof this.state.currentValue != 'number'}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}