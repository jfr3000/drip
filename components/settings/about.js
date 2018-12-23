import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import AppText from '../app-text'
import SettingsSegment from './settings-segment'
import styles from '../../styles/index'
import labels from '../../i18n/en/settings'
import replace from '../helpers/replace-url-with-text'

export default class AboutSection extends Component {
  render() {
    return (
      <ScrollView>
        <SettingsSegment title={`${labels.aboutSection.title} `}>
          <Hyperlink linkStyle={styles.link} linkText={replace}>
            <AppText>{`${labels.aboutSection.segmentExplainer} `}</AppText>
          </Hyperlink>
        </SettingsSegment>
        <SettingsSegment title={`${labels.credits.title} `} style={styles.settingsSegmentLast}>
          <AppText>{`${labels.credits.note}`}</AppText>
        </SettingsSegment>
      </ScrollView>
    )
  }
}
