import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import AppText from './app-text'
import AppIcon from './app-icon'

import { Colors, Containers, Spacing, Typography } from '../../styles/redesign'

const Segment = ({ children, icon, last, title }) => {
  const containerStyle = last ? styles.containerLast : styles.container

  return (
    <View style={containerStyle}>
      {title &&
        <View style={styles.line}>
          {icon && <AppIcon name={icon} color={Colors.purple} />}
          <AppText style={styles.title}>{title}</AppText>
        </View>
      }
      {children}
    </View>
  )
}

Segment.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  last: PropTypes.bool,
  title: PropTypes.string
}

const segmentContainer = {
  marginHorizontal: Spacing.base,
  marginBottom: Spacing.base,
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey,
    paddingBottom: Spacing.base,
    ...segmentContainer
  },
  containerLast: {
    ...segmentContainer
  },
  line: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    ...Typography.subtitle
  }
})

export default Segment
