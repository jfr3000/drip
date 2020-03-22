import React, { Component } from 'react'
import {
  View,
  Switch
} from 'react-native'
import AppText from '../../common/app-text'
import {
  periodReminderObservable,
  savePeriodReminder
} from '../../../local-storage'
import labels from '../../../i18n/en/settings'

export default class PeriodReminderPicker extends Component {
  constructor(props) {
    super(props)
    this.state = periodReminderObservable.value
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <AppText>{labels.periodReminder.reminderText}</AppText>
        </View>
        <Switch
          value={this.state.enabled}
          onValueChange={switchOn => {
            this.setState({ enabled: switchOn })
            savePeriodReminder({enabled: switchOn})
          }}
        />
      </View>
    )
  }
}