import React, { Component } from 'react'
import {
  ScrollView, View
} from 'react-native'
import styles, { iconStyles } from '../../../styles'
import labels from '../../../i18n/en/settings'
import AppText from '../../app-text'
import TempSlider from './temp-slider'
import UseCervixSetting from './use-cervix'
import Icon from 'react-native-vector-icons/Entypo'

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
        <View style={[styles.settingsSegment, styles.settingsSegmentLast]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="info-with-circle" style={iconStyles.infoInHeading}/>
            <AppText style={styles.settingsSegmentTitle}>{`${labels.preOvu.title} `}</AppText>
          </View>
          <AppText>{`${labels.preOvu.note} `}</AppText>
        </View>
      </ScrollView>
    )
  }
}
