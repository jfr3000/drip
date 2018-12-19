import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Switch
} from 'react-native'
import AppText from '../../app-text'
import {
  useCervixObservable,
  saveUseCervix
} from '../../../local-storage'
import styles from '../../../styles/index'
import { settings as labels } from '../../../i18n/en/settings'

export default class UseCervixSetting extends Component {
  constructor() {
    super()
    this.state = {useCervix: useCervixObservable.value}
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.settingsSegment}
      >
        <AppText style={styles.settingsSegmentTitle}>
          {labels.useCervix.title}
        </AppText>
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
      </TouchableOpacity>
    )
  }
}
