import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles, { iconStyles, secondaryColor } from '../../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { menuTitles } from '../../i18n/en/labels'

const menuTitlesLowerCase = Object.keys(menuTitles).reduce((acc, curr) => {
  acc[curr] = menuTitles[curr].toLowerCase()
  return acc
}, {})

const MenuItem = ({ icon, labelKey, active, onPress }) => {
  const styleActive = active ? { color: secondaryColor } : null
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <Icon name={icon} {...iconStyles.menuIcon} {...styleActive} />
      <Text
        testID={active ? 'activeMenuItem' : `menuItem${labelKey}`}
        style={[styles.menuText, styleActive]}
      >
        {menuTitlesLowerCase[labelKey]}
      </Text>
    </TouchableOpacity>
  )
}

export default MenuItem