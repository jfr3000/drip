import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

import Link from './link'

import { Colors, Typography } from '../../styles/redesign'

const AppText = ({ children, linkStyle, style, ...props }) => {
  // we parse for links in case the text contains any
  return (
    <Link style={linkStyle}>
      <Text style={[styles.text, style]} {...props}>
        {children}
      </Text>
    </Link>
  )
}

AppText.propTypes = {
  children: PropTypes.node,
  linkStyle: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}

const styles = StyleSheet.create({
  text: {
    color: Colors.greyDark,
    ...Typography.mainText
  }
})

export default AppText