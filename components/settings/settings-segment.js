import React from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'
import AppText from '../app-text'
import styles from '../../styles'

const SettingsSegment = ({ children, ...props }) => {
  return (
    <View style={styles.settingsSegment}>
      <AppText style={styles.settingsSegmentTitle}>{props.title}</AppText>
      {children}
    </View>
  )
}

SettingsSegment.propTypes = {
  title: PropTypes.string.isRequired
}

export default SettingsSegment