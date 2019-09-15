import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import MenuItem from './menu-item'

import { connect } from 'react-redux'
import { getNavigation, navigate } from '../../slices/navigation'

import { menuItems } from './menu-config'

import styles from '../../styles'

const Menu = ({ navigation, navigate }) => {
  return (
    <View style={styles.menu}>
      { menuItems.map(({ icon, labelKey, component, children }) => {
        const isActive = (component === navigation.current) ||
          (children && children.indexOf(navigation.current) !== -1)
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