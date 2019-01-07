import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import AppText from '../app-text'
import SettingsSegment from './common/settings-segment'
import styles from '../../styles/index'
import labels, { links } from '../../i18n/en/settings'
import replace from '../helpers/replace-url-with-text'

export default class AboutSection extends Component {
  render() {
    return (
      <ScrollView>
        <SettingsSegment title={labels.aboutSection.title}>
          <Hyperlink linkStyle={styles.link} linkText={replace}>
            <AppText>{labels.aboutSection.text}</AppText>
          </Hyperlink>
        </SettingsSegment>
        <SettingsSegment title={labels.philosophy.title}>
          <AppText>{labels.philosophy.text}</AppText>
        </SettingsSegment>
        <SettingsSegment title={labels.credits.title}>
          <AppText>{labels.credits.note}</AppText>
        </SettingsSegment>
        <SettingsSegment title={labels.website.title}>
          <Hyperlink linkStyle={styles.link}>
            <AppText>{links.website.url}</AppText>
          </Hyperlink>
        </SettingsSegment>
        <SettingsSegment title={labels.version.title} last>
          <AppText>{require('../../package.json').version}</AppText>
        </SettingsSegment>
      </ScrollView>
    )
  }
}
