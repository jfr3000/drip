import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

import { Colors, Typography } from '../../styles'

const AppText = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  )
}

AppText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const styles = StyleSheet.create({
  text: {
    color: Colors.greyDark,
    ...Typography.mainText,
  },
})

export default AppText
