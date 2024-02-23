import React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from './app-text'

import { Colors, Containers, Spacing } from '../../styles'

const AppSwitch = ({ onToggle, text, value, disabled }) => {
  const trackColor = { true: Colors.turquoiseDark }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText>{text}</AppText>
      </View>
      <Switch
        onValueChange={onToggle}
        style={styles.switch}
        value={value}
        trackColor={trackColor}
        disabled={disabled}
      />
    </View>
  )
}

AppSwitch.propTypes = {
  onToggle: PropTypes.func.isRequired,
  text: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
  },
  switch: {
    flex: 1,
    marginBottom: Spacing.tiny,
    transform:
      Platform.OS === 'ios'
        ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
        : [{ scaleX: 1 }, { scaleY: 1 }],
  },
  textContainer: {
    flex: 4,
  },
})

export default AppSwitch
