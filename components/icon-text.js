import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from './app-text'

import styles from '../styles'

const IconText = ({ children, wrapperStyles }) => {
  return (
    <View style={[ styles.homeIconTextWrapper, wrapperStyles ]}>
      <AppText style={styles.iconText}>
        { children }
      </AppText>
    </View>
  )
}

IconText.propTypes = {
  children: PropTypes.node,
  wrapperStyles: PropTypes.object,
}

export default IconText
