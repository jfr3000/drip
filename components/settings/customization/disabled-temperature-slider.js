import React from 'react'
import { StyleSheet, View } from 'react-native'
import Slider from '@ptomasroos/react-native-multi-slider'

import SliderLabel from './slider-label'

import { scaleObservable } from '../../../local-storage'
import { Colors, Sizes } from '../../../styles'

import { TEMP_MIN, TEMP_MAX, TEMP_SLIDER_STEP } from '../../../config'

const DisabledTemperatureSlider = () => {
  const savedValue = scaleObservable.value
  const minTemperature = savedValue.min
  const maxTemperature = savedValue.max

  return (
    <View style={styles.container}>
      <Slider
        customLabel={SliderLabel}
        enableLabel={true}
        markerStyle={styles.marker}
        markerOffsetY={Sizes.tiny}
        max={TEMP_MAX}
        min={TEMP_MIN}
        selectedStyle={styles.sliderAccentBackground}
        step={TEMP_SLIDER_STEP}
        trackStyle={styles.slider}
        unselectedStyle={styles.sliderBackground}
        values={[minTemperature, maxTemperature]}
        enabledOne={false}
        enabledTwo={false}
      />
    </View>
  )
}

export default DisabledTemperatureSlider

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Sizes.base,
  },
  marker: {
    backgroundColor: Colors.grey,
    borderRadius: 50,
    elevation: 4,
    height: Sizes.subtitle,
    width: Sizes.subtitle,
  },
  slider: {
    borderRadius: 25,
    height: Sizes.small,
  },
  sliderAccentBackground: {
    backgroundColor: Colors.grey,
  },
  sliderBackground: {
    backgroundColor: Colors.greyLight,
  },
})
