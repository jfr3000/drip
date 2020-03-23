import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Fonts, Sizes, Spacing, Typography } from '../../styles/redesign'

const AppPage = ({ children, title }) => {
  return(
    <ScrollView style={styles.container}>
      {title && <AppText style={styles.title}>{title}</AppText>}
      {children}
    </ScrollView>
  )
}

AppPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tourquiseLight,
    flex: 1
  },
  title: {
    alignSelf: 'center',
    fontFamily: Fonts.bold,
    fontWeight: '700',
    fontSize: Sizes.title,
    marginHorizontal: Spacing.base,
    ...Typography.title
  }
})

export default AppPage