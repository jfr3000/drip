import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import MenuItem from './menu-item'

import { Containers } from '../../styles'
import { pages } from '../pages'

const Menu = ({ currentPage, navigate }) => {
  const menuItems = pages.filter((page) => page.isInMenu)

  return (
    <View style={styles.container}>
      {menuItems.map(({ icon, label, component }) => {
        return (
          <MenuItem
            isActive={component === currentPage}
            onPress={() => navigate(component)}
            icon={icon}
            key={label}
            label={label}
          />
        )
      })}
    </View>
  )
}

Menu.propTypes = {
  currentPage: PropTypes.string,
  navigate: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    ...Containers.rowContainer,
  },
})

export default Menu
