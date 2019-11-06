import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import MenuItem from './menu-item'

import { connect } from 'react-redux'
import { getNavigation, navigate } from '../../slices/navigation'

import { pages } from '../pages'

import styles from '../../styles'

const Menu = ({ navigate, navigation }) => {
  const menuItems = pages.filter(page => page.isInMenu)
  return (
    <View style={styles.menu}>
      { menuItems.map(({ icon, label, component, children }) => {
        const isActive = (component === navigation.currentPage) ||
          (children && children.indexOf(navigation.currentPage) !== -1)
        return (
          <MenuItem
            key={label}
            label={label}
            icon={icon}
            active={isActive}
            onPress={() => navigate(component)}
          />
        )}
      )}
    </View >
  )
}

Menu.propTypes = {
  navigation: PropTypes.object,
  navigate: PropTypes.func,
}

const mapStateToProps = (state) => {
  return({
    navigation: getNavigation(state),
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu)