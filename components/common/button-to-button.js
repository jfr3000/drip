import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

const ButtonToButton = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

ButtonToButton.propTypes = {
  children: PropTypes.node,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default ButtonToButton
