import React from 'react'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import FramedSegment from '../common/framed-segment'

import labels from '../../i18n/en/settings'
import links from '../../i18n/en/links'

const AboutSection = () => {
  return (
    <AppPage title={labels.aboutSection.title} >
      <FramedSegment>
        <AppText>{labels.aboutSection.text}</AppText>
      </FramedSegment>
      <FramedSegment title={labels.philosophy.title}>
        <AppText>{labels.philosophy.text}</AppText>
      </FramedSegment>
      <FramedSegment title={labels.credits.title}>
        <AppText>{labels.credits.note}</AppText>
      </FramedSegment>
      <FramedSegment title={labels.donate.title}>
        <AppText>{labels.donate.note}</AppText>
      </FramedSegment>
      <FramedSegment title={labels.website.title}>
        <AppText>{links.website.url}</AppText>
      </FramedSegment>
      <FramedSegment title={labels.version.title} last>
        <AppText>{require('../../package.json').version}</AppText>
      </FramedSegment>
    </AppPage>
  )
}

export default AboutSection
