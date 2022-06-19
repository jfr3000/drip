import React, { Component } from 'react'
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

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

export default class HamburgerMenu extends Component {
  constructor(props) {
    super(props)

    this.state = { shouldShowMenu: false }
  }

  toggleMenu = () => {
    this.setState({ shouldShowMenu: !this.state.shouldShowMenu })
  }

  render() {
    const { shouldShowMenu } = this.state

    return (
      <React.Fragment>
        {!shouldShowMenu && (
          <TouchableOpacity onPress={this.toggleMenu} hitSlop={HIT_SLOP}>
            <AppIcon name="dots-three-vertical" color={Colors.orange} />
          </TouchableOpacity>
        )}
        {shouldShowMenu && (
          <Modal
            animationType="fade"
            onRequestClose={this.toggleMenu}
            transparent={true}
            visible={shouldShowMenu}
          >
            <TouchableOpacity
              onPress={this.toggleMenu}
              style={styles.blackBackground}
            ></TouchableOpacity>
            <View style={styles.menu}>
              <View style={styles.iconContainer}>
                <CloseIcon color={'black'} onClose={() => this.toggleMenu()} />
              </View>
              {settingsMenuItems.map((item) => (
                <MenuItem
                  item={item}
                  key={item.name}
                  closeMenu={this.toggleMenu}
                />
              ))}
            </View>
          </Modal>
        )}
      </React.Fragment>
    )
  }
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
