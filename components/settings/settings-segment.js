import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import AppText from '../app-text'
import styles from '../../styles'

const SettingsSegment = ({ children, ...props }) => {
  const style = [styles.settingsSegment, props.style]
  if (props.last) style.push(styles.settingsSegmentLast)
  return (
    <View style={style}>
      <AppText style={styles.settingsSegmentTitle}>{props.title}</AppText>
      {children}
    </View>
  )
}

SettingsSegment.propTypes = {
  title: PropTypes.string.isRequired
}

export default SettingsSegment