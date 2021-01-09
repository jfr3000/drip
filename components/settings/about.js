import React from 'react'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import Segment from '../common/segment'

import labels from '../../i18n/en/settings'
import links from '../../i18n/en/links'

const AboutSection = () => {
  return (
    <AppPage title={labels.aboutSection.title} >
      <Segment>
        <AppText>{labels.aboutSection.text}</AppText>
      </Segment>
      <Segment title={labels.philosophy.title}>
        <AppText>{labels.philosophy.text}</AppText>
      </Segment>
      <Segment title={labels.credits.title}>
        <AppText>{labels.credits.note}</AppText>
      </Segment>
      <Segment title={labels.donate.title}>
        <AppText>{labels.donate.note}</AppText>
      </Segment>
      <Segment title={labels.website.title}>
        <AppText>{links.website.url}</AppText>
      </Segment>
      <Segment title={labels.version.title} last>
        <AppText>{require('../../package.json').version}</AppText>
      </Segment>
    </AppPage>
  )
}

export default AboutSection
