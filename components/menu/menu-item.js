import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'

import styles, { iconStyles, secondaryColor } from '../../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { menuTitles } from '../../i18n/en/labels'

const menuTitlesLowerCase = Object.keys(menuTitles).reduce((acc, curr) => {
  acc[curr] = menuTitles[curr].toLowerCase()
  return acc
}, {})

export default function MenuItem({ active, icon, label, onPress }) {
  const styleActive = active ? { color: secondaryColor } : null

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} >
      <Icon name={icon} {...iconStyles.menuIcon} {...styleActive} />
      <Text
        testID={active ? 'activeMenuItem' : `menuItem${label}`}
        style={[styles.menuText, styleActive]}
      >
        {menuTitlesLowerCase[label]}
      </Text>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}