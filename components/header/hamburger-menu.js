import React, { useState } from 'react'
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import AppIcon from '../common/app-icon'
import CloseIcon from '../common/close-icon'
import MenuItem from './menu-item'

import { Colors, Sizes } from '../../styles'
import settingsLabels from '../../i18n/en/settings'
import { HIT_SLOP } from '../../config'

const { menuItems } = settingsLabels

const settingsMenuItems = [
  { name: menuItems.settings, component: 'SettingsMenu' },
  { name: menuItems.about, component: 'About' },
  { name: menuItems.license, component: 'License' },
  { name: menuItems.privacyPolicy, component: 'PrivacyPolicy' },
]

const HamburgerMenu = ({ navigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  if (!isOpen)
    return (
      <TouchableOpacity onPress={() => setIsOpen(true)} hitSlop={HIT_SLOP}>
        <AppIcon name="dots-three-vertical" color={Colors.orange} />
      </TouchableOpacity>
    )

  return (
    <Modal animationType="fade" onRequestClose={closeMenu} transparent={true}>
      <TouchableOpacity
        onPress={closeMenu}
        style={styles.blackBackground}
      ></TouchableOpacity>
      <View style={styles.menu}>
        <View style={styles.iconContainer}>
          <CloseIcon color={'black'} onClose={closeMenu} />
        </View>
        {settingsMenuItems.map((item) => (
          <MenuItem
            item={item}
            key={item.name}
            closeMenu={closeMenu}
            navigate={navigate}
          />
        ))}
      </View>
    </Modal>
  )
}

export default HamburgerMenu

HamburgerMenu.propTypes = {
  navigate: PropTypes.func,
}

const styles = StyleSheet.create({
  blackBackground: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.65,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    marginBottom: Sizes.base,
  },
  menu: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    height: '100%',
    padding: Sizes.base,
    paddingTop: Platform.OS === 'ios' ? Sizes.huge : Sizes.base,
    position: 'absolute',
    width: '60%',
  },
})
