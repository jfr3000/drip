import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Slider from '@ptomasroos/react-native-multi-slider'

import alertError from '../shared/alert-error'
import SliderLabel from './slider-label'

import { scaleObservable, saveTempScale } from '../../../local-storage'
import { Colors, Sizes } from '../../../styles/redesign'
import labels from '../../../i18n/en/settings'
import { TEMP_MIN, TEMP_MAX, TEMP_SLIDER_STEP } from '../../../config'

export default class TemperatureSlider extends Component {
  constructor(props) {
    super(props)

    const { min, max } = scaleObservable.value
    this.state = { minTemperature: min, maxTemperature: max }
  }

  onTemperatureSliderChange = (values) => {
    this.setState({
      minTemperature: values[0],
      maxTemperature: values[1]
    })

    try {
      saveTempScale({ min: values[0], max: values[1] })
    } catch(err) {
      alertError(labels.tempScale.saveError)
    }
  }

  render() {
    const { minTemperature, maxTemperature } = this.state

    return (
      <View style={styles.container}>
        <Slider
          customLabel={SliderLabel}
          enableLabel={true}
          markerStyle={styles.marker}
          markerOffsetY={Sizes.tiny}
          max={TEMP_MAX}
          min={TEMP_MIN}
          onValuesChange={this.onTemperatureSliderChange}
          selectedStyle={styles.sliderAccentBackground}
          step={TEMP_SLIDER_STEP}
          trackStyle={styles.slider}
          unselectedStyle={styles.sliderBackground}
          values={[minTemperature, maxTemperature]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Sizes.base
  },
  marker: {
    backgroundColor: Colors.tourquiseDark,
    borderRadius: 50,
    elevation: 4,
    height: Sizes.subtitle,
    width: Sizes.subtitle
  },
  slider: {
    borderRadius: 25,
    height: Sizes.small
  },
  sliderAccentBackground: {
    backgroundColor: Colors.tourquiseDark
  },
  sliderBackground: {
    backgroundColor: Colors.tourquise
  },
})
