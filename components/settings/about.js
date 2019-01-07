import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import AppText from '../app-text'
import SettingsSegment from './settings-segment'
import styles from '../../styles/index'
import labels from '../../i18n/en/settings'

export default class AboutSection extends Component {
  render() {
    return (
      <ScrollView>
        <SettingsSegment title={`${labels.aboutSection.title} `}>
          <AppText>{`${labels.aboutSection.segmentExplainer} `}</AppText>
        </SettingsSegment>
        <SettingsSegment title={`${labels.credits.title} `} style={styles.settingsSegmentLast}>
          <AppText>{`${labels.credits.note}`}</AppText>
        </SettingsSegment>
      </ScrollView>
    )
  }
}
