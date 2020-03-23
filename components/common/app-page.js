import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Typography } from '../../styles/redesign'

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
    ...Typography.title
  }
})

export default AppPage