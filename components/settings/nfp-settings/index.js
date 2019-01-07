import React, { Component } from 'react'
import {
  ScrollView, View
} from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import styles, { iconStyles } from '../../../styles'
import labels from '../../../i18n/en/settings'
import AppText from '../../app-text'
import SettingsSegment from '../common/settings-segment'
import TempSlider from './temp-slider'
import UseCervixSetting from './use-cervix'
import Icon from 'react-native-vector-icons/Entypo'
import replaceUrlWithText from '../../helpers/replace-url-with-text'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <ScrollView>
        <SettingsSegment title={labels.useCervix.title}>
          <UseCervixSetting/>
        </SettingsSegment>
        <SettingsSegment title={labels.tempScale.segmentTitle}>
          <AppText>{labels.tempScale.segmentExplainer}</AppText>
          <TempSlider/>
        </SettingsSegment>
        <SettingsSegment style={styles.settingsSegmentLast} >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="info-with-circle" style={iconStyles.infoInHeading}/>
            <AppText style={styles.settingsSegmentTitle}>{`${labels.preOvu.title} `}</AppText>
          </View>
          <Hyperlink linkStyle={styles.link} linkText={replaceUrlWithText}>
            <AppText>{labels.preOvu.note}</AppText>
          </Hyperlink>
        </SettingsSegment>
      </ScrollView>
    )
  }
}