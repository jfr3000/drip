import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

import Link from './link'

import { Colors, Typography } from '../../styles/redesign'

export default function AppText({ children, onPress, numberOfLines, style}) {
  // we parse for links in case the text contains any
  return (
    <Link>
      <Text style={[styles.text, style]}
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

const styles = StyleSheet.create({
  text: {
    color: Colors.grey,
    ...Typography.mainText
  }
})