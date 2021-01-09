import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import Logo from './logo'
import HamburgerMenu from './hamburger-menu'

import { Colors, Containers, Sizes } from '../../styles'

const Header = ({ isSideMenuEnabled }) => {

  return (
    <View style={styles.header}>
      <Logo />
      {isSideMenuEnabled && <HamburgerMenu />}
    </View >
  )
}

Header.propTypes = {
  isSideMenuEnabled: PropTypes.bool
}

Header.defaultProps = {
  isSideMenuEnabled: true
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.purple,
    padding: Sizes.base,
    ...Containers.rowContainer
  }
})

export default Header