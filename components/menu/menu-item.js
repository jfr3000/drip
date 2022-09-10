import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Icon from '../common/menu-icon'

import { Colors, Containers, Fonts, Sizes, Spacing } from '../../styles'

const MenuItem = ({ isActive, icon, label, onPress }) => {
  const textStyle = isActive ? styles.menuTextActive : styles.menuText
  const testID = isActive ? 'activeMenuItem' : `menuItem${label}`

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} isActive={isActive} />
      <Text testID={testID} style={textStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

const text = {
  fontFamily: Fonts.bold,
  fontSize: Sizes.small,
  textTransform: 'uppercase',
}

const styles = StyleSheet.create({
  button: {
    padding: Spacing.base,
    ...Containers.centerItems,
  },
  menuText: {
    color: Colors.grey,
    ...text,
  },
  menuTextActive: {
    color: Colors.orange,
    ...text,
  },
})

export default MenuItem
