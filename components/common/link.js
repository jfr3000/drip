import React from 'react'
import PropTypes from 'prop-types'
import Hyperlink from 'react-native-hyperlink'
import { StyleSheet } from 'react-native'

import { Colors, Typography } from '../../styles'

import links from '../../i18n/en/links'

const Link = ({ children, style }) => {
  return (
    <Hyperlink
      linkStyle={[styles.link, style]}
      linkText={replaceUrlWithText}
      linkDefault
    >
      {children}
    </Hyperlink>
  )
}

Link.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

const styles = StyleSheet.create({
  link: {
    color: Colors.purple,
    textDecorationLine: 'underline',
    ...Typography.mainText,
  }
})

function replaceUrlWithText(url) {
  const link = Object.values(links).find(l => l.url === url)
  return (link && link.text) || url
}

export default Link