import React, { Component } from 'react'
import {
  View,
  Text,
  Switch
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import styles from '../../../styles'
import { saveSymptom } from '../../../db'
import {
  mucusFeeling as feelingLabels,
  mucusTexture as textureLabels
} from '../labels/labels'
import computeSensiplanValue from '../../../lib/sensiplan-mucus'


export default class Mucus extends Component {
  constructor(props) {
    super(props)
    this.cycleDay = props.cycleDay
    this.makeActionButtons = props.makeActionButtons
    this.state = {
      exclude: this.cycleDay.mucus ? this.cycleDay.mucus.exclude : false
    }

    this.state.currentFeelingValue = this.cycleDay.mucus && this.cycleDay.mucus.feeling
    if (typeof this.state.currentFeelingValue !== 'number') {
      this.state.currentFeelingValue = -1
    }

    this.state.currentTextureValue = this.cycleDay.mucus && this.cycleDay.mucus.texture
    if (typeof this.state.currentTextureValue !== 'number') {
      this.state.currentTextureValue = -1
    }
  }

  render() {
    const mucusFeelingRadioProps = [
      {label: feelingLabels[0], value: 0 },
      {label: feelingLabels[1], value: 1 },
      {label: feelingLabels[2], value: 2 },
      {label: feelingLabels[3], value: 3 }
    ]
    const mucusTextureRadioProps = [
      {label: textureLabels[0], value: 0 },
      {label: textureLabels[1], value: 1 },
      {label: textureLabels[2], value: 2 }
    ]
    return(
      <View style={ styles.symptomEditView }>
        <Text style={styles.symptomDayView}>Mucus</Text>
        <Text style={styles.symptomDayView}>Feeling</Text>
        <View style={styles.radioButtonRow}>
          <RadioForm
            radio_props={mucusFeelingRadioProps}
            initial={this.state.currentFeelingValue}
            formHorizontal={true}
            labelHorizontal={false}
            labelStyle={styles.radioButton}
            onPress={(itemValue) => {
              this.setState({ currentFeelingValue: itemValue })
            }}
          />
        </View>
        <Text style={styles.symptomDayView}>Texture</Text>
        <View style={styles.radioButtonRow}>
          <RadioForm
            radio_props={mucusTextureRadioProps}
            initial={this.state.currentTextureValue}
            formHorizontal={true}
            labelHorizontal={false}
            labelStyle={styles.radioButton}
            onPress={(itemValue) => {
              this.setState({ currentTextureValue: itemValue })
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
              symptom: 'mucus',
              cycleDay: this.cycleDay,
              saveAction: () => {
                saveSymptom('mucus', this.cycleDay, {
                  feeling: this.state.currentFeelingValue,
                  texture: this.state.currentTextureValue,
                  computedNfp: computeSensiplanValue(this.state.currentFeelingValue, this.state.currentTextureValue),
                  exclude: this.state.exclude
                })
              },
              saveDisabled: this.state.currentFeelingValue === -1 || this.state.currentTextureValue === -1
            }
          )}
        </View>

      </View>
    )
  }
}
