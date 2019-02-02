import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import AppText from './app-text'
import styles from '../styles'

const FramedSegment = ({ children, ...props }) => {
  const style = [styles.framedSegment, props.style]
  if (props.last) style.push(styles.framedSegmentLast)
  return (
    <View style={[style]}>
      {
        props.title
        && <AppText style={styles.framedSegmentTitle}>{props.title}</AppText>
      }
      {children}
    </View>
  )
}

FramedSegment.propTypes = {
  title: PropTypes.string
}

export default FramedSegment
