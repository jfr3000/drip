import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import AppText from '../common/app-text'
import Segment from '../common/segment'

import { Colors, Containers, Sizes } from '../../styles'
import { useTranslation } from 'react-i18next'

const MenuItem = ({ item, last, navigate }) => {
  const { t } = useTranslation(null, {
    keyPrefix: 'hamburgerMenu.settings.menuItem',
  })
  return (
    <Segment last={last}>
      <TouchableOpacity
        style={styles.container}
        key={item.label}
        onPress={() => navigate(item.componentName)}
      >
        <View>
          <AppText style={styles.title}>{t(`${item.label}.name`)}</AppText>
          {!!item.label && <AppText>{t(`${item.label}.text`)}</AppText>}
        </View>
        <AppIcon name="chevron-right" color={Colors.orange} />
      </TouchableOpacity>
    </Segment>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  last: PropTypes.bool.isRequired,
  navigate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
  },
  title: {
    color: Colors.purple,
    fontSize: Sizes.subtitle,
  },
})

export default MenuItem
