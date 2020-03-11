import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import styles from "../styles"
import Link from './link'

export default function AppText({ children, onPress, numberOfLines, style}) {
  // we parse for links in case the text contains any
  return (
    <Link>
      <Text style={[styles.appText, style]}
        onPress={onPress}
        numberOfLines={numberOfLines}
      >
        {children}
      </Text>
    </Link>
  )
}

AppText.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  numberOfLines: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
