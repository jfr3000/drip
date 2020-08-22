import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Typography } from '../../styles'

const AppPage = ({
  children,
  contentContainerStyle,
  scrollViewStyle,
  title,
  ...props
}) => {
  return(
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollView, contentContainerStyle]}
        style={scrollViewStyle}
        {...props}
      >
        {title && <AppText style={styles.title}>{title}</AppText>}
        {children}
      </ScrollView>
    </View>
  )
}

AppPage.propTypes = {
  children: PropTypes.node,
  contentContainerStyle: PropTypes.object,
  scrollViewStyle: PropTypes.object,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tourquiseLight,
    flex: 1
  },
  scrollView: {
    backgroundColor: Colors.tourquiseLight,
    flexGrow: 1
  },
  title: {
    ...Typography.title
  }
})

export default AppPage