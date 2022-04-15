import React, { Component } from 'react'
import { Platform } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import PropTypes from 'prop-types'

import AppSwitch from '../../common/app-switch'

import {
  saveTempReminder,
  tempReminderObservable,
} from '../../../local-storage'
import padWithZeros from '../../helpers/pad-time-with-zeros'

import labels from '../../../i18n/en/settings'
import { withTranslation } from 'react-i18next'

class TemperatureReminder extends Component {
  constructor(props) {
    super(props)

    const { time, enabled } = tempReminderObservable.value
    this.state = {
      isEnabled: enabled,
      isTimePickerVisible: false,
      time,
    }
  }

  temperatureReminderToggle = (value) => {
    if (value) {
      this.setState({ isTimePickerVisible: true })
    } else {
      saveTempReminder({ enabled: false })
      this.setState({ isEnabled: false })
    }
  }

  onPickDate = (date) => {
    const time = padWithZeros(date)

    this.setState({ isEnabled: true, isTimePickerVisible: false, time })
    saveTempReminder({ time, enabled: true })
  }

  onPickDateCancel = () => {
    this.setState({ isTimePickerVisible: false })
  }

  render() {
    const { isEnabled, isTimePickerVisible, time } = this.state
    const { t } = this.props

    const tempReminderText =
      time && isEnabled
        ? labels.tempReminder.timeSet(time)
        : labels.tempReminder.noTimeSet

    return (
      <React.Fragment>
        <AppSwitch
          onToggle={this.temperatureReminderToggle}
          text={tempReminderText}
          value={isEnabled}
        />
        <DateTimePicker
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={this.onPickDate}
          onCancel={this.onPickDateCancel}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          headerTextIOS={t('labels.shared.dateTimePickerTitle')}
        />
      </React.Fragment>
    )
  }
}

TemperatureReminder.propTypes = {
  t: PropTypes.func.isRequired,
}
export default withTranslation()(TemperatureReminder)
