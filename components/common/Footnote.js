import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'
import Asterisk from '../common/Asterisk'

import { Colors, Spacing } from '../../styles'

const Footnote = ({ children }) => {
  if (!children) return false

  return (
    <View style={styles.container}>
      <Asterisk />
      <AppText linkStyle={styles.link} style={styles.text}>
        {children}
      </AppText>
    </View>
  )
}

Footnote.propTypes = {
  children: PropTypes.node,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginBottom: Spacing.tiny,
    marginTop: Spacing.small,
  },
  link: {
    color: 'white',
  },
  text: {
    color: Colors.greyLight,
    paddingLeft: Spacing.base,
  },
})

export default Footnote
