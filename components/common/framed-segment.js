import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import AppText from './app-text'

import { Containers, Typography } from '../../styles/redesign'

const FramedSegment = ({ children, last, style, title }) => {
  const containerStyle = last ? styles.containerLast : styles.container

  return (
    <View style={[containerStyle, style]}>
      {title && <AppText style={styles.title}>{title}</AppText>}
      {children}
    </View>
  )
}

FramedSegment.propTypes = {
  children: PropTypes.node,
  last: PropTypes.bool,
  style: PropTypes.object,
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

export default FramedSegment
