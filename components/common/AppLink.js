import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, Linking } from 'react-native'

import { Colors, Typography } from '../../styles'

const AppLink = ({ children, url, ...props }) => {
  return (
    <Text style={styles.link} {...props} onPress={() => Linking.openURL(url)}>
      {children}
    </Text>
  )
}

AppLink.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
}

const styles = StyleSheet.create({
  link: {
    ...Typography.mainText,
    color: Colors.purple,
    textDecorationLine: 'underline',
  },
})

export default AppLink
