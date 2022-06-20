import React from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import Segment from '../common/segment'

import { Colors, Sizes } from '../../styles'

const PrivacyPolicy = () => {
  const { t } = useTranslation()
  const sections = ['intro', 'dataUse', 'permissions', 'transparency']

  return (
    <AppPage title={t('settings.privacyPolicy.title')}>
      {sections.map((sectionItem) => {
        return (
          <Segment last key={sectionItem.id}>
            <AppText style={styles.title}>
              {t(`settings.privacyPolicy.${sectionItem}.title`)}
            </AppText>
            <AppText>{t(`settings.privacyPolicy.${sectionItem}.text`)}</AppText>
          </Segment>
        )
      })}
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
