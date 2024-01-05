import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import AppIcon from '../common/app-icon'
import AppPage from '../common/app-page'
import AppText from '../common/app-text'
import Segment from '../common/segment'

import { Colors, Spacing, Typography } from '../../styles'
import labels from '../../i18n/en/settings'

const Info = () => {
  const { t } = useTranslation(null, { keyPrefix: 'hamburgerMenu.info' })
  return (
    <AppPage title={t('title')}>
      <Segment last>
        <View style={styles.line}>
          <AppIcon
            color={Colors.purple}
            name="info-with-circle"
            style={styles.icon}
          />
          <AppText style={styles.title}>{labels.preOvu.title}</AppText>
        </View>
        <AppText>{labels.preOvu.note}</AppText>
      </Segment>
    </AppPage>
  )
}

Info.propTypes = {
  children: PropTypes.node,
}

export default Info

const styles = StyleSheet.create({
  icon: {
    marginRight: Spacing.base,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Typography.subtitle,
  },
})
