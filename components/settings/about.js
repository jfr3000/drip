import React from 'react'
import { Linking } from 'react-native'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import Segment from '../common/segment'
import Button from '../common/button'
import ButtonToButton from '../common/button-to-button'

import labels from '../../i18n/en/settings'
import links from '../../i18n/en/links'

const AboutSection = () => {
  return (
    <AppPage title={labels.aboutSection.title}>
      <Segment>
        <AppText>{labels.aboutSection.text}</AppText>
        <ButtonToButton>
          <Button
            isCTA
            isSmall={true}
            onPress={() => Linking.openURL(links.email.url)}
          >
            {links.email.text}
          </Button>
          <Button
            isCTA
            isSmall={true}
            onPress={() => Linking.openURL(links.gitlab.url)}
          >
            {links.gitlab.text}
          </Button>
          <Button
            isCTA
            isSmall={true}
            onPress={() => Linking.openURL(links.website.url)}
          >
            {links.website.text}
          </Button>
        </ButtonToButton>
      </Segment>
      <Segment title={labels.philosophy.title}>
        <AppText>{labels.philosophy.text}</AppText>
      </Segment>
      <Segment title={labels.credits.title}>
        <AppText>{labels.credits.note}</AppText>
      </Segment>
      <Segment title={labels.donate.title}>
        <AppText>{labels.donate.note}</AppText>
        <Button
          isCTA
          isSmall={true}
          onPress={() => Linking.openURL(links.donate.url)}
        >
          {links.donate.text}
        </Button>
      </Segment>
      <Segment title={labels.version.title} last>
        <AppText>{require('../../package.json').version}</AppText>
      </Segment>
    </AppPage>
  )
}

export default AboutSection
