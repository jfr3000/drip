import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import AppText from './app-text'

import { Containers, Typography } from '../../styles/redesign'

const Segment = ({ children, last, title }) => {
  const containerStyle = last ? styles.containerLast : styles.container

  return (
    <View style={containerStyle}>
      {title && <AppText style={styles.title}>{title}</AppText>}
      {children}
    </View>
  )
}

Segment.propTypes = {
  children: PropTypes.node,
  last: PropTypes.bool,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    ...Containers.segmentContainer,
    ...Containers.bottomBorder
  },
  containerLast: {
    ...Containers.segmentContainer,
    ...Containers.marginBottom
  },
  title: {
    ...Typography.titleSmall
  }
})

export default Segment
