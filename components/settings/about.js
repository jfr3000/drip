import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import AppText from '../app-text'
import FramedSegment from '../framed-segment'
import styles from '../../styles/index'
import labels, { links } from '../../i18n/en/settings'
import replace from '../helpers/replace-url-with-text'

export default class AboutSection extends Component {
  render() {
    return (
      <ScrollView>
        <FramedSegment title={labels.aboutSection.title}>
          <Hyperlink linkStyle={styles.link} linkText={replace} linkDefault>
            <AppText>{labels.aboutSection.text}</AppText>
          </Hyperlink>
        </FramedSegment>
        <FramedSegment title={labels.philosophy.title}>
          <AppText>{labels.philosophy.text}</AppText>
        </FramedSegment>
        <FramedSegment title={labels.credits.title}>
          <AppText>{labels.credits.note}</AppText>
        </FramedSegment>
        <FramedSegment title={labels.website.title}>
          <Hyperlink linkStyle={styles.link} linkDefault>
            <AppText>{links.website.url}</AppText>
          </Hyperlink>
        </FramedSegment>
        <FramedSegment title={labels.version.title} last>
          <AppText>{require('../../package.json').version}</AppText>
        </FramedSegment>
      </ScrollView>
    )
  }
}
