import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import settingsViews from './settings'

import { menuTitles } from '../i18n/en/labels'

import styles, { iconStyles, secondaryColor } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const menuTitlesLowerCase = Object.keys(menuTitles).reduce((acc, curr) => {
  acc[curr] = menuTitles[curr].toLowerCase()
  return acc
}, {})

const menuItems = [
  {
    labelKey: 'Home',
    icon: 'home',
    component: 'Home',
  },
  {
    labelKey: 'Calendar',
    icon: 'calendar-range',
    component: 'Calendar',
  },
  {
    labelKey: 'Chart',
    icon: 'chart-line',
    component: 'Chart',
  },
  {
    labelKey: 'Stats',
    icon: 'chart-pie',
    component: 'Stats',
  },
  {
    labelKey: 'Settings',
    icon: 'settings',
    component: 'SettingsMenu',
    children: Object.keys(settingsViews),
  }
]

const MenuItem = ({ icon, labelKey, active, onPress }) => {
  const styleActive = active ? { color: secondaryColor } : null
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <Icon name={icon} {...iconStyles.menuIcon} {...styleActive} />
      <Text style={[styles.menuText, styleActive]}>
        {menuTitlesLowerCase[labelKey]}
      </Text>
    </TouchableOpacity>
  )
}

const Menu = ({ currentPage, navigate }) => {
  return (
    <View style={styles.menu}>
      { menuItems.map(({ icon, labelKey, component, children }) => {
        const isActive = (component === currentPage) ||
          (children && children.indexOf(currentPage) !== -1)
        return (
          <MenuItem
            key={labelKey}
            labelKey={labelKey}
            icon={icon}
            active={isActive}
            onPress={() => navigate(component)}
          />
        )}
      )}
    </View >
  )
}

export default Menu