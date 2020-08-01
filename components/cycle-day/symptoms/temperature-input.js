import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import AppText from '../../common/app-text'
import AppTextInput from '../../common/app-text-input'

import { temperature as labels } from '../../../i18n/en/cycle-day'

import styles from '../../../styles'

import { getPreviousTemperature } from '../../../db'
import { scaleObservable } from '../../../local-storage'
import { TEMP_MAX, TEMP_MIN } from '../../../config'

export default class TemperatureInput extends Component {

  static propTypes = {
    temperature: PropTypes.string,
    handleTemperatureChange: PropTypes.func,
    date: PropTypes.string,
  }

  constructor(props) {
    super(props)

    let shouldShowSuggestion = false
    let suggestedTemperature = null

    if (!props.temperature) {
      const prevTemp = getPreviousTemperature(props.date)
      if (prevTemp) {
        shouldShowSuggestion = true
        suggestedTemperature = prevTemp.toString()
      }
    }

    this.state = {
      temperature: props.temperature,
      shouldShowSuggestion,
      suggestedTemperature
    }
  }

  setTemperature = (temperature) => {
    this.setState({
      shouldShowSuggestion: false,
      temperature
    })
    this.props.handleTemperatureChange(Number(temperature))
  }

  render () {
    const {
      shouldShowSuggestion,
      suggestedTemperature,
      temperature
    } = this.state
    const inputStyle = [
      styles.temperatureTextInput,
      shouldShowSuggestion ? styles.temperatureTextInputSuggestion : null
    ]
    return (
      <React.Fragment>
        <View style={styles.framedSegmentInlineChildren}>
          <AppTextInput
            style={inputStyle}
            autoFocus={true}
            value={shouldShowSuggestion ? suggestedTemperature : temperature}
            onChangeText={this.setTemperature}
            keyboardType='numeric'
            maxLength={5}
            testID='temperatureInput'
          />
          <AppText style={{ marginLeft: 5 }}>°C</AppText>
        </View>
        <OutOfRangeWarning temperature={this.props.temperature} />
      </React.Fragment>
    )
  }
}

const OutOfRangeWarning = ({ temperature }) => {
  if (temperature === '') {
    return false
  }

  const value = Number(temperature)
  const range = { min: TEMP_MIN, max: TEMP_MAX }
  const scale = scaleObservable.value

  let warningMsg

  if (value < range.min || value > range.max) {
    warningMsg = labels.outOfAbsoluteRangeWarning
  } else if (value < scale.min || value > scale.max) {
    warningMsg = labels.outOfRangeWarning
  } else {
    warningMsg = null
  }

  return <AppText style={styles.hint}>{warningMsg}</AppText>
}

OutOfRangeWarning.propTypes = {
  temperature: PropTypes.string.isRequired
}
