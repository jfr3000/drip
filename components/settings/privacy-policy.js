import React from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import Segment from '../common/segment'

import { Colors, Sizes } from '../../styles'

const PrivacyPolicy = () => {
  const { t } = useTranslation(null, { keyPrefix: 'settings.privacyPolicy' })
  const sections = ['intro', 'dataUse', 'permissions', 'transparency']

  return (
    <AppPage title={t('title')}>
      {sections.map((sectionItem) => (
        <Segment last key={sectionItem}>
          <AppText style={styles.title}>{t(`${sectionItem}.title`)}</AppText>
          <AppText>{t(`${sectionItem}.text`)}</AppText>
        </Segment>
      ))}
    </AppPage>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Colors.purple,
    fontSize: Sizes.subtitle,
  },
})

export default PrivacyPolicy
