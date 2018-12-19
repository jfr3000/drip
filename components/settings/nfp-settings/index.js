import React, { Component } from 'react'
import {
  ScrollView, View
} from 'react-native'
import styles from '../../../styles'
import labels from '../../../i18n/en/settings'
import AppText from '../../app-text'
import TempSlider from './temp-slider'
import UseCervixSetting from './use-cervix'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <UseCervixSetting/>
        <View style={styles.settingsSegment}>
          <AppText style={styles.settingsSegmentTitle}>
            {labels.tempScale.segmentTitle}
          </AppText>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          <TempSlider/>
        </View>
      </ScrollView>
    )
  }
}
