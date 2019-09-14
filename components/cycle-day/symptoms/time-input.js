import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'

import AppTextInput from '../../app-text-input'
import styles from '../../../styles'

import DateTimePicker from 'react-native-modal-datetime-picker-nevo'
import moment from 'moment'

export default class TimeInput extends Component {

  static propTypes = {
    time: PropTypes.string,
    handleTimeChange: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      isTimePickerVisible: false,
    }
  }

  showTimePicker = () => {
    Keyboard.dismiss()
    this.setState({ isTimePickerVisible: true })
  }

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false })
  }

  handleConfirm = (jsDate) => {
    // DateTimePicker also when in mode="time" returns full date (with time)
    const time = moment(jsDate).format('HH:mm')
    this.props.handleTimeChange(time)
    this.setState({
      isTimePickerVisible: false
    })
  }

  render () {
    return (
      <React.Fragment>
        <AppTextInput
          style={styles.temperatureTextInput}
          onFocus={this.showTimePicker}
          value={this.props.time}
          testID='timeInput'
        />
        <DateTimePicker
          mode="time"
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleConfirm}
          onCancel={this.hideTimePicker}
        />
      </React.Fragment>
    )
  }
}
