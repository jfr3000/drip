import React from 'react'
import PropTypes from 'prop-types'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
import iconConfig from '../../selection.json'

import { Colors, Sizes } from '../../styles'

const Icon = createIconSetFromIcoMoon(iconConfig, '', 'Menu')

const MenuIcon = ({ isActive, name }) => {
  const color = isActive ? Colors.greyDark : Colors.grey

  return <Icon name={name} size={Sizes.icon} color={color} />
}

MenuIcon.propTypes = {
  isActive: PropTypes.bool,
  name: PropTypes.string.isRequired,
}

export default MenuIcon
