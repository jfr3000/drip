import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import Icon from '../common/menu-icon'

import { connect } from 'react-redux'
import { getNavigation, navigate } from '../../slices/navigation'

import { Colors, Containers, Fonts, Sizes, Spacing } from '../../styles/redesign'

const MenuItem = ({ component, icon, label, navigate, navigation }) => {
  const isActive = (component === navigation.currentPage)
  const textStyle = isActive ? styles.menuTextActive : styles.menuText
  const testID = isActive ? 'activeMenuItem' : `menuItem${label}`

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate(component)}
    >
      <Icon name={icon} isActive={isActive}/>
      <Text testID={testID} style={textStyle} >{label}</Text>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  component: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  navigation: PropTypes.object,
  navigate: PropTypes.func,
}

const text = {
  fontFamily: Fonts.bold,
  fontSize: Sizes.small,
  textTransform: 'uppercase'
}

const styles = StyleSheet.create({
  button: {
    padding: Spacing.base,
    ...Containers.centerItems
  },
  menuText: {
    color: Colors.grey,
    ...text
  },
  menuTextActive: {
    color: Colors.orange,
    ...text
  }
})

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
)(MenuItem)
