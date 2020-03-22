import React, { Component } from 'react'
import {
  View,
  Switch
} from 'react-native'
import AppText from '../../common/app-text'
import {
  useCervixObservable,
  saveUseCervix
} from '../../../local-storage'
import labels from '../../../i18n/en/settings'

export default class UseCervixSetting extends Component {
  constructor() {
    super()
    this.state = {useCervix: useCervixObservable.value}
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          {this.state.useCervix ?
            <AppText>{labels.useCervix.cervixModeOn}</AppText>
            :
            <AppText>{labels.useCervix.cervixModeOff}</AppText>
          }
        </View>
        <Switch
          value={this.state.useCervix}
          onValueChange={bool => {
            this.setState({ useCervix: bool })
            saveUseCervix(bool)
          }}
        />
      </View>
    )
  }
}
