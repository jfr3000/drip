import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

const ButtonRow = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

ButtonRow.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default ButtonRow
