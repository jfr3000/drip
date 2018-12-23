import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import AppText from '../app-text'
import SettingsSegment from './settings-segment'
import styles from '../../styles/index'
import labels, { links } from '../../i18n/en/settings'
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
        <View style={styles.settingsSegment}>
          <AppText style={styles.settingsSegmentTitle}>{`${labels.philosophy.title} `}</AppText>
          <AppText>{labels.philosophy.text}</AppText>
        </View>
        <View style={styles.settingsSegment}>
          <Hyperlink linkStyle={styles.link} linkText={replace}>
            <AppText style={styles.settingsSegmentTitle}>{`${labels.aboutSection.title} `}</AppText>
            <AppText>{labels.aboutSection.text}</AppText>
          </Hyperlink>
        </View>
        <SettingsSegment title={`${labels.credits.title} `} style={styles.settingsSegmentLast}>
          <AppText>{`${labels.credits.note}`}</AppText>
        </SettingsSegment>
        <View style={[styles.settingsSegment, styles.settingsSegmentLast]}>
          <Hyperlink linkStyle={styles.link}>
            <AppText style={styles.settingsSegmentTitle}>{`${labels.website.title} `}</AppText>
            <AppText>{links.website.url}</AppText>
          </Hyperlink>
        </View>
        <View style={[styles.settingsSegment, styles.settingsSegmentLast]}>
          <AppText style={styles.settingsSegmentTitle}>{`${labels.version.title} `}</AppText>
          <AppText>{require('../../package.json').version}</AppText>
        </View>
      </ScrollView>
    )
  }
}
