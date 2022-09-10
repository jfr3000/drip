import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import Logo from './logo'
import HamburgerMenu from './hamburger-menu'

import { Colors, Containers, Sizes } from '../../styles'

const Header = ({ isStatic, navigate }) => {
  return (
    <View style={styles.header}>
      {isStatic ? (
        <Logo />
      ) : (
        <>
          <TouchableOpacity onPress={() => navigate('Home')}>
            <Logo />
          </TouchableOpacity>
          <HamburgerMenu navigate={navigate} />
        </>
      )}
    </View>
  )
}

Header.propTypes = {
  isStatic: PropTypes.bool,
  navigate: PropTypes.func,
}

Header.defaultProps = {
  isStatic: false,
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.purple,
    padding: Sizes.base,
    ...Containers.rowContainer,
  },
})

export default Header
