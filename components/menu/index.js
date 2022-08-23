import React from 'react'
import { StyleSheet, View } from 'react-native'

import MenuItem from './menu-item'

import { Containers } from '../../styles'
import { pages } from '../pages'

const Menu = () => {
  const menuItems = pages.filter((page) => page.isInMenu)

  return (
    <View style={styles.container}>
      {menuItems.map(({ icon, label, component }) => {
        return (
          <MenuItem
            component={component}
            icon={icon}
            key={label}
            label={label}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    ...Containers.rowContainer,
  },
})

export default Menu
