import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import AppText from '../app-text'
import SettingsSegment from './shared/settings-segment'
import labels from '../../i18n/en/settings'
import links from '../../i18n/en/links'

export default class AboutSection extends Component {
  render() {
    return (
      <ScrollView>
        <SettingsSegment title={labels.aboutSection.title}>
          <AppText>{labels.aboutSection.text}</AppText>
        </SettingsSegment>
        <SettingsSegment title={labels.philosophy.title}>
          <AppText>{labels.philosophy.text}</AppText>
        </SettingsSegment>
        <SettingsSegment title={labels.credits.title}>
          <AppText>{labels.credits.note}</AppText>
        </SettingsSegment>
        <SettingsSegment title={labels.website.title}>
          <AppText>{links.website.url}</AppText>
        </SettingsSegment>
        <SettingsSegment title={labels.version.title} last>
          <AppText>{require('../../package.json').version}</AppText>
        </SettingsSegment>
      </ScrollView>
    )
  }
}
