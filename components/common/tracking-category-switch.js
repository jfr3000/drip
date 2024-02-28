import React from 'react'
import { Platform, StyleSheet, Switch, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from './app-text'

import DripIcon from '../../assets/drip-icons'
import { Colors, Containers, Sizes, Spacing } from '../../styles'

const TrackingCategorySwitch = ({ onToggle, symptom, text, value }) => {
  const trackColor = { true: Colors.turquoiseDark }
  const iconColor = value ? Colors.iconColors[symptom].color : Colors.grey

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <DripIcon
          color={iconColor}
          name={`drip-icon-${symptom}`}
          size={Sizes.title}
        />
      </View>
      <View style={styles.textContainer}>
        <AppText>{text}</AppText>
      </View>
      <Switch
        onValueChange={onToggle}
        style={styles.appSwitch}
        value={value}
        trackColor={trackColor}
      />
    </View>
  )
}

TrackingCategorySwitch.propTypes = {
  onToggle: PropTypes.func.isRequired,
  symptom: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
    marginVertical: Spacing.tiny,
  },
  iconContainer: {
    marginRight: Spacing.tiny,
    flex: 1,
  },
  textContainer: {
    flex: 5,
  },
  appSwitch: {
    flex: 2,
    transform:
      Platform.OS === 'ios'
        ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
        : [{ scaleX: 1 }, { scaleY: 1 }],
  },
})
export default TrackingCategorySwitch
