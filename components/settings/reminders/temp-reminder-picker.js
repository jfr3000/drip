import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Switch
} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker-nevo'
import AppText from '../../common/app-text'
import {
  tempReminderObservable,
  saveTempReminder
} from '../../../local-storage'
import labels from '../../../i18n/en/settings'
import padWithZeros from '../../helpers/pad-time-with-zeros'

export default class TempReminderPicker extends Component {
  constructor(props) {
    super(props)
    const { time, enabled } = tempReminderObservable.value
    this.state = {
      time,
      enabled,
      isTimePickerVisible: false
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => this.setState({ isTimePickerVisible: true })}
      >
        <View style={{ flex: 1 }}>
          {this.state.time && this.state.enabled ?
            <AppText>{labels.tempReminder.timeSet(this.state.time)}</AppText>
            :
            <AppText>{labels.tempReminder.noTimeSet}</AppText>
          }
        </View>
        <Switch
          value={this.state.enabled}
          onValueChange={switchOn => {
            this.setState({ enabled: switchOn })
            if (switchOn && !this.state.time) {
              this.setState({ isTimePickerVisible: true })
            }
            if (!switchOn) saveTempReminder({ enabled: false })
          }}
        />
        <DateTimePicker
          mode="time"
          isVisible={this.state.isTimePickerVisible}
          onConfirm={jsDate => {
            const time = padWithZeros(jsDate)
            this.setState({
              time,
              isTimePickerVisible: false,
              enabled: true
            })
            saveTempReminder({
              time,
              enabled: true
            })
          }}
          onCancel={() => {
            this.setState({ isTimePickerVisible: false })
            if (!this.state.time) this.setState({enabled: false})
          }}
        />
      </TouchableOpacity>
    )
  }
}
