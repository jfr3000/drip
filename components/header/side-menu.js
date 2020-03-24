import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import AppIcon from '../common/app-icon'
import MenuItem from './menu-item'

import { Sizes } from '../../styles/redesign'
import settingsLabels from '../../i18n/en/settings'

const { menuItems } = settingsLabels

const settingsMenuItems = [
  { name: menuItems.settings, component: 'SettingsMenu' },
  { name: menuItems.about, component: 'About' },
  { name: menuItems.license, component: 'License' },
]

const SideMenu = ({ shouldShowMenu, toggleMenu }) => {
  return(
    <React.Fragment>
      {!shouldShowMenu &&
        <TouchableOpacity onPress={toggleMenu}>
          <AppIcon name={'dots-three-vertical'} isCTA/>
        </TouchableOpacity>
      }
      {shouldShowMenu &&
        <Modal
          animationType='fade'
          onRequestClose={toggleMenu}
          transparent={true}
          visible={shouldShowMenu}
        >
          <View style={styles.blackBackground}></View>
          <View style={styles.menu}>
            <TouchableOpacity onPress={toggleMenu} style={styles.iconContainer}>
              <AppIcon name={'cross'} isCTA={false}/>
            </TouchableOpacity>
            {settingsMenuItems.map(item =>
              <MenuItem
                item={item}
                key={item.name}
                closeMenu={toggleMenu}
              />
            )}
          </View>
        </Modal>
      }
    </React.Fragment>
  )
}

SideMenu.propTypes = {
  shouldShowMenu: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func
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
  }
})

export default SideMenu
