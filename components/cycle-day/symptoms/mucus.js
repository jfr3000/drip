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
  mucusFeeling as feelingLabels,
  mucusTexture as textureLabels
} from '../labels/labels'
import computeSensiplanValue from '../../../lib/sensiplan-mucus'
import ActionButtonFooter from './action-button-footer'


export default class Mucus extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    this.state = {
      exclude: this.cycleDay.mucus ? this.cycleDay.mucus.exclude : false
    };

    /* eslint-disable react/no-direct-mutation-state */
    ['feeling', 'texture'].forEach(label => {
      this.state[label] = this.cycleDay.mucus && this.cycleDay.mucus[label]
      if (typeof this.state[label] !== 'number') {
        this.state[label] = -1
      }
    })
    /* eslint-enable react/no-direct-mutation-state */
  }

  render() {
    const mucusFeelingRadioProps = [
      { label: feelingLabels[0], value: 0 },
      { label: feelingLabels[1], value: 1 },
      { label: feelingLabels[2], value: 2 },
      { label: feelingLabels[3], value: 3 }
    ]
    const mucusTextureRadioProps = [
      { label: textureLabels[0], value: 0 },
      { label: textureLabels[1], value: 1 },
      { label: textureLabels[2], value: 2 }
    ]
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <Text style={styles.symptomDayView}>Feeling</Text>
            <View style={styles.radioButtonRow}>
              <RadioForm
                radio_props={mucusFeelingRadioProps}
                initial={this.state.feeling}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({ feeling: itemValue })
                }}
              />
            </View>
            <Text style={styles.symptomDayView}>Texture</Text>
            <View style={styles.radioButtonRow}>
              <RadioForm
                radio_props={mucusTextureRadioProps}
                initial={this.state.texture}
                formHorizontal={true}
                labelHorizontal={false}
                labelStyle={styles.radioButton}
                onPress={(itemValue) => {
                  this.setState({ texture: itemValue })
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
          symptom='mucus'
          cycleDay={this.cycleDay}
          saveAction={() => {
            saveSymptom('mucus', this.cycleDay, {
              feeling: this.state.feeling,
              texture: this.state.texture,
              value: computeSensiplanValue(this.state.feeling, this.state.texture),
              exclude: this.state.exclude
            })
          }}
          saveDisabled={this.state.feeling === -1 || this.state.texture === -1}
          navigate={this.props.navigate}
        />
      </View>
    )
  }
}
