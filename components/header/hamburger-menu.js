import React, { Component } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import MenuItem from './menu-item'

import { Colors, Sizes } from '../../styles'
import settingsLabels from '../../i18n/en/settings'

const { menuItems } = settingsLabels

const settingsMenuItems = [
  { name: menuItems.settings, component: 'SettingsMenu' },
  { name: menuItems.about, component: 'About' },
  { name: menuItems.license, component: 'License' },
]

export default class HamburgerMenu extends Component {

  constructor(props) {
    super(props)

    this.state = { shouldShowMenu: false }
  }

  toggleMenu = () => {
    this.setState({ shouldShowMenu: !this.state.shouldShowMenu})
  }

  render() {
    const { shouldShowMenu } = this.state

    return(
      <React.Fragment>
        {!shouldShowMenu &&
          <TouchableOpacity onPress={this.toggleMenu}>
            <AppIcon name='dots-three-vertical' color={Colors.orange}/>
          </TouchableOpacity>
        }
        {shouldShowMenu &&
          <Modal
            animationType='fade'
            onRequestClose={this.toggleMenu}
            transparent={true}
            visible={shouldShowMenu}
          >
            <TouchableOpacity
              onPress={this.toggleMenu}
              style={styles.blackBackground}
            >
            </TouchableOpacity>
            <View style={styles.menu}>
              <TouchableOpacity
                onPress={this.toggleMenu}
                style={styles.iconContainer}
              >
                <AppIcon name='cross' color='black'/>
              </TouchableOpacity>
              {settingsMenuItems.map(item =>
                <MenuItem
                  item={item}
                  key={item.name}
                  closeMenu={this.toggleMenu}
                />
              )}
            </View>
          </Modal>
        }
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
