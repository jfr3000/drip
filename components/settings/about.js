import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import AppText from '../app-text'
import labels from '../../i18n/en/settings'
import links from '../../i18n/en/links'
import FramedSegment from '../framed-segment'

export default class AboutSection extends Component {
  render() {
    return (
      <ScrollView>
        <FramedSegment title={labels.aboutSection.title}>
          <AppText>{labels.aboutSection.text}</AppText>
        </FramedSegment>
        <FramedSegment title={labels.philosophy.title}>
          <AppText>{labels.philosophy.text}</AppText>
        </FramedSegment>
        <FramedSegment title={labels.credits.title}>
          <AppText>{labels.credits.note}</AppText>
        </FramedSegment>
        <FramedSegment title={labels.website.title}>
          <AppText>{links.website.url}</AppText>
        </FramedSegment>
        <FramedSegment title={labels.version.title} last>
          <AppText>{require('../../package.json').version}</AppText>
        </FramedSegment>
      </ScrollView>
    )
  }
}
