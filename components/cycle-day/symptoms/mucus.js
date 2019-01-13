import React, { Component } from 'react'
import {
  View,
  Switch,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import { mucus as labels } from '../../../i18n/en/cycle-day'
import computeNfpValue from '../../../lib/nfp-mucus'
import ActionButtonFooter from './action-button-footer'
import SelectTabGroup from '../select-tab-group'
import SymptomSection from './symptom-section'
import { ActionHint } from '../../app-text'

export default class Mucus extends Component {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.mucus = cycleDay && cycleDay.mucus
    this.makeActionButtons = props.makeActionButtons
    this.state = this.mucus ? this.mucus : {}
  }

  render() {
    const mucusFeeling = [
      { label: labels.feeling.categories[0], value: 0 },
      { label: labels.feeling.categories[1], value: 1 },
      { label: labels.feeling.categories[2], value: 2 },
      { label: labels.feeling.categories[3], value: 3 }
    ]
    const mucusTexture = [
      { label: labels.texture.categories[0], value: 0 },
      { label: labels.texture.categories[1], value: 1 },
      { label: labels.texture.categories[2], value: 2 }
    ]
    const mandatoryNotCompletedYet = typeof this.state.feeling != 'number' || typeof this.state.texture != 'number'
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.page}>
          <SymptomSection
            header='Feeling'
            explainer={labels.feeling.explainer}
          >
            <SelectTabGroup
              buttons={mucusFeeling}
              onSelect={val => this.setState({ feeling: val })}
              active={this.state.feeling}
            />
          </SymptomSection>
          <SymptomSection
            header='Texture'
            explainer={labels.texture.explainer}
          >
            <SelectTabGroup
              buttons={mucusTexture}
              onSelect={val => this.setState({ texture: val })}
              active={this.state.texture}
            />
          </SymptomSection>
          <SymptomSection
            header="Exclude"
            explainer={labels.excludeExplainer}
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
        <ActionHint isVisible={mandatoryNotCompletedYet}>{labels.actionHint}</ActionHint>
        <ActionButtonFooter
          symptom='mucus'
          date={this.props.date}
          currentSymptomValue={this.mucus}
          saveAction={() => {
            const feeling = this.state.feeling
            const texture = this.state.texture
            saveSymptom('mucus', this.props.date, {
              feeling,
              texture,
              value: computeNfpValue(feeling, texture),
              exclude: Boolean(this.state.exclude)
            })
          }}
          saveDisabled={mandatoryNotCompletedYet}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
