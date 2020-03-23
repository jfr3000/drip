import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import AppIcon from '../common/app-icon'
import AppText from '../common/app-text'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { Sizes, Typography } from '../../styles/redesign'
import settingsLabels from '../../i18n/en/settings'

const { menuItems } = settingsLabels

const settingsMenuItems = [
  {name: menuItems.settings, component: 'SettingsMenu'},
  {name: menuItems.about, component: 'About'},
  {name: menuItems.license, component: 'License'},
]

const SideMenu = ({ navigate, onPress, shouldShowMenu }) => {
  const navigateMenuItem = (page) => {
    onPress()
    navigate(page)
  }

  return(
    <React.Fragment>
      {!shouldShowMenu &&
        <TouchableOpacity onPress={onPress}>
          <AppIcon name={'dots-three-vertical'} isCTA/>
        </TouchableOpacity>
      }
      {shouldShowMenu &&
        <Modal
          animationType='fade'
          onRequestClose={onPress}
          transparent={true}
          visible={shouldShowMenu}
        >
          <View style={styles.blackBackground}></View>
          <View style={styles.menu}>
            <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
              <AppIcon name={'cross'}/>
            </TouchableOpacity>
            {settingsMenuItems.map(item =>
              <MenuItem
                item={item}
                key={item.name}
                navigate={navigateMenuItem}
              />
            )}
          </View>
        </Modal>
      }
    </React.Fragment>
  )
}

SideMenu.propTypes = {
  navigate: PropTypes.func.isRequired,
  onPress: PropTypes.func,
  shouldShowMenu: PropTypes.bool.isRequired
}

const MenuItem = ({ item, navigate }) => {
  return(
    <View style={styles.menuItem}>
      <TouchableOpacity onPress={() => navigate(item.component)}>
        <AppText style={styles.text}>{item.name}</AppText>
      </TouchableOpacity>
    </View>
  )
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  blackBackground: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.65,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    marginBottom: Sizes.base
  },
  menu: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    height: '100%',
    padding: Sizes.base,
    position: 'absolute',
    width: '60%'
  },
  text: {
    ...Typography.subtitle
  }
})

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps,
)(SideMenu)
