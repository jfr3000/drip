import React, { Component } from 'react'
import { View } from 'react-native'
import CreatePassword from './create'
import ChangePassword from './update'
import DeletePassword from './delete'
import AppText from '../../app-text'
import {
  hasEncryptionObservable
} from '../../../local-storage'
import styles from '../../../styles/index'
import { settings as labels } from '../../../i18n/en/settings'

export default class PasswordSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUpdateAndDelete: hasEncryptionObservable.value,
      showCreate: !hasEncryptionObservable.value
    }
  }

  render() {
    return (
      <View style={styles.settingsSegment}>

        <AppText style={styles.settingsSegmentTitle}>
          {labels.passwordSettings.title}
        </AppText>

        {this.state.showUpdateAndDelete ?
          <AppText>{labels.passwordSettings.explainerEnabled}</AppText>
          :
          <AppText>{labels.passwordSettings.explainerDisabled}</AppText>
        }

        {this.state.showUpdateAndDelete &&
          <View>
            <ChangePassword/>
            <DeletePassword/>
          </View>
        }

        {this.state.showCreate &&
          <CreatePassword/>
        }

      </View>
    )
  }
}