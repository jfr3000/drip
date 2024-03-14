import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Slider from '@ptomasroos/react-native-multi-slider'

import alertError from '../common/alert-error'
import SliderLabel from './slider-label'

import { scaleObservable, saveTempScale } from '../../../local-storage'
import { Colors, Sizes } from '../../../styles'
import labels from '../../../i18n/en/settings'
import { TEMP_MIN, TEMP_MAX, TEMP_SLIDER_STEP } from '../../../config'

const TemperatureSlider = ({ disabled }) => {
  const savedValue = scaleObservable.value
  const [minTemperature, setMinTemperature] = useState(savedValue.min)
  const [maxTemperature, setMaxTemperature] = useState(savedValue.max)

  const onTemperatureSliderChange = ([min, max]) => {
    setMinTemperature(min)
    setMaxTemperature(max)
    try {
      saveTempScale({ min, max })
    } catch (err) {
      alertError(labels.tempScale.saveError)
    }
  }

  const sliderAccentBackground = disabled
    ? styles.disabledSliderAccentBackground
    : styles.sliderAccentBackground

  const sliderBackground = disabled
    ? styles.disabledSliderBackground
    : styles.sliderBackground

  return (
    <View style={styles.container}>
      <Slider
        customLabel={SliderLabel}
        enableLabel={true}
        markerStyle={styles.marker}
        markerOffsetY={Sizes.tiny}
        max={TEMP_MAX}
        min={TEMP_MIN}
        onValuesChange={onTemperatureSliderChange}
        step={TEMP_SLIDER_STEP}
        trackStyle={styles.slider}
        values={[minTemperature, maxTemperature]}
        enabledOne={!disabled}
        enabledTwo={!disabled}
        selectedStyle={sliderAccentBackground}
        unselectedStyle={sliderBackground}
      />
    </View>
  )
}

export default TemperatureSlider

TemperatureSlider.propTypes = {
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Sizes.base,
  },
  marker: {
    backgroundColor: Colors.turquoiseDark,

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
    backgroundColor: Colors.turquoiseDark,
  },
  disabledSliderAccentBackground: {
    backgroundColor: Colors.grey,
  },
  sliderBackground: {
    backgroundColor: Colors.turquoise,
  },
  disabledSliderBackground: {
    backgroundColor: Colors.greyLight,
  },
})
