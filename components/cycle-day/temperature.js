import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

import AppText from '../common/app-text'
import AppTextInput from '../common/app-text-input'
import Segment from '../common/segment'

import { connect } from 'react-redux'
import { getDate } from '../../slices/date'
import { isTemperatureOutOfRange, isPreviousTemperature } from '../helpers/cycle-day'

import { temperature as labels } from '../../i18n/en/cycle-day'

import { Colors, Containers, Sizes, Spacing } from '../../styles'

const formatTemperature = value => value === null
  ? value
  : Number.parseFloat(value).toFixed(2)

class Temperature extends Component {

  static propTypes = {
    data: PropTypes.object,
    date: PropTypes.string.isRequired,
    save: PropTypes.func
  }

  constructor(props) {
    super(props)

    const { data, date } = this.props
    const { value } = data
    const { shouldShowSuggestion, suggestedTemperature } =
      isPreviousTemperature(date)

    this.state = {
      isTimePickerVisible: false,
      shouldShowSuggestion,
      suggestedTemperature: formatTemperature(suggestedTemperature),
      value: formatTemperature(value)
    }
  }

  onCancelTimePicker = () => {
    this.setState({ isTimePickerVisible: false })
  }

  onChangeTemperature = (value) => {
    if (!Number(value)) return false

    this.setState({
      value: value.trim(),
      shouldShowSuggestion: false
    })
  }

  onShowTimePicker = () => {
    Keyboard.dismiss()
    this.setState({ isTimePickerVisible: true })
  }

  setTemperature = () => {
    const { value } = this.state
    this.props.save(value, 'value')
  }

  setTime = (jsDate) => {
    const time = moment(jsDate).format('HH:mm')
    const isTimePickerVisible = false

    this.props.save(time, 'time')
    this.setState({ isTimePickerVisible })
  }

  render() {
    const { shouldShowSuggestion, suggestedTemperature, value } = this.state
    const { time } = this.props.data

    const inputStyle = (shouldShowSuggestion && value === null)
      ? { color: Colors.grey }
      : {color: Colors.greyDark}
    const outOfRangeWarning = isTemperatureOutOfRange(value)
    let temperatureToShow = null

    if (value) {
      temperatureToShow = value
    } else if (shouldShowSuggestion) {
      temperatureToShow = suggestedTemperature
    }

    return (
      <React.Fragment>
        <Segment>
          <AppText style={styles.title}>{labels.temperature.explainer}</AppText>
          <View style={styles.container}>
            <AppTextInput
              value={temperatureToShow === null ? '' : temperatureToShow}
              onChangeText={this.onChangeTemperature}
              onEndEditing={this.setTemperature}
              keyboardType="numeric"
              maxLength={5}
              style={inputStyle}
              testID="temperatureInput"
              underlineColorAndroid="transparent"
            />
            <AppText>°C</AppText>
          </View>
          { outOfRangeWarning !== null &&
            <View style={styles.hintContainer}>
              <AppText style={styles.hint}>{outOfRangeWarning}</AppText>
            </View>
          }
        </Segment>
        <Segment>
          <AppText style={styles.title}>{labels.time}</AppText>
          <AppTextInput
            onFocus={this.onShowTimePicker}
            testID='timeInput'
            value={time}
          />
          <DateTimePicker
            isVisible={this.state.isTimePickerVisible}
            mode="time"
            onConfirm={this.setTime}
            onCancel={this.onCancelTimePicker}
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />
        </Segment>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer
  },
  hint: {
    fontStyle: 'italic',
    fontSize: Sizes.small
  },
  hintContainer: {
    marginVertical: Spacing.tiny
  },
  title: {
    fontSize: Sizes.subtitle
  }
})


const mapStateToProps = (state) => {
  return({
    date: getDate(state),
  })
}

export default connect(
  mapStateToProps,
  null,
)(Temperature)
