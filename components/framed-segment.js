import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import AppText from './app-text'
import styles from '../styles'

const FramedSegment = ({ children, last, style, title }) => {
  const viewStyle = [styles.framedSegment, style]
  if (last) viewStyle.push(styles.framedSegmentLast)
  return (
    <View style={[viewStyle]}>
      {title && <AppText style={styles.framedSegmentTitle}>{title}</AppText>}
      {children}
    </View>
  )
}

FramedSegment.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  last: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string
}

export default FramedSegment
