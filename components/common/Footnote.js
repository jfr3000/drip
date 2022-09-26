import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'
import Asterisk from '../common/Asterisk'

import { Colors, Spacing } from '../../styles'

const Footnote = ({ children, colorLabel }) => {
  if (!children) return false

  return (
    <View style={styles.container}>
      <Asterisk />
      <AppText
        linkStyle={styles.link}
        style={{ ...styles.text, color: Colors[colorLabel] }}
      >
        {children}
      </AppText>
    </View>
  )
}

Footnote.propTypes = {
  children: PropTypes.node,
  colorLabel: PropTypes.string,
}

Footnote.defaultProps = {
  colorLabel: 'greyDark',
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginBottom: Spacing.tiny,
    marginTop: Spacing.base,
  },
  link: {
    color: 'white',
  },
  text: {
    paddingLeft: Spacing.small,
  },
})

export default Footnote
