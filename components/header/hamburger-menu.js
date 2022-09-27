import React, { useState } from 'react'
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import AppText from '../common/app-text'

import AppIcon from '../common/app-icon'
import CloseIcon from '../common/close-icon'

import { Colors, Sizes, Typography } from '../../styles'
import { HIT_SLOP } from '../../config'
import { useTranslation } from 'react-i18next'

const settingsMenuItems = [
  { labelKey: 'settings', componentName: 'SettingsMenu' },
  { labelKey: 'about', componentName: 'About' },
  { labelKey: 'license', componentName: 'License' },
  { labelKey: 'privacyPolicy', componentName: 'PrivacyPolicy' },
]

const HamburgerMenu = ({ navigate }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  const { t } = useTranslation(null, { keyPrefix: 'hamburgerMenu.menuMain' })

  if (!isOpen)
    return (
      <TouchableOpacity onPress={() => setIsOpen(true)} hitSlop={HIT_SLOP}>
        <AppIcon name="dots-three-vertical" color={Colors.orange} />
      </TouchableOpacity>
    )

  function onPress(componentName) {
    closeMenu()
    navigate(componentName)
  }

  return (
    <Modal animationType="fade" onRequestClose={closeMenu} transparent>
      <TouchableOpacity onPress={closeMenu} style={styles.blackBackground} />
      <View style={styles.menu}>
        <View style={styles.iconContainer}>
          <CloseIcon color={'black'} onClose={closeMenu} />
        </View>
        {settingsMenuItems.map(({ labelKey, componentName }) => (
          <TouchableOpacity
            onPress={() => onPress(componentName)}
            key={labelKey}
          >
            <AppText style={styles.menuItem}>{t(labelKey)}</AppText>
          </TouchableOpacity>
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
  menuItem: Typography.subtitle,
})
