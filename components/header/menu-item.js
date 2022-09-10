import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'

import { Typography } from '../../styles'

const MenuItem = ({ item, navigate, closeMenu }) => {
  const { component, name } = item
  const onPress = () => {
    closeMenu()
    navigate(component)
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{name}</AppText>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  text: {
    ...Typography.subtitle,
  },
})

export default MenuItem
