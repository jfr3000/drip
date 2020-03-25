import React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from './app-text'

import { Containers } from '../../styles/redesign'

const AppSwitch = ({ onToggle, text, value }) => {
  return (
    <View style={styles.line}>
      <View style={styles.textContainer}>
        <AppText>{text}</AppText>
      </View>
      <Switch onValueChange={onToggle} style={styles.switch} value={value} />
    </View>
  )
}

AppSwitch.propTypes = {
  onToggle: PropTypes.func.isRequired,
  text: PropTypes.string,
  value: PropTypes.bool.isRequired
}

const styles = StyleSheet.create({
  line: {
    ...Containers.rowContainer
  },
  switch: {
    flex: 1,
  },
  textContainer: {
    flex: 4,
  }
})

export default AppSwitch