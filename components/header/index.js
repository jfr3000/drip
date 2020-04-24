import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import Logo from './logo'
import SideMenu from './side-menu'

import { Colors, Containers, Sizes } from '../../styles/redesign'

export default class Header extends Component {
  static propTypes = {
    isSideMenuEnabled: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = { shouldShowMenu: false }
  }

  toggleMenu = () => {
    this.setState({ shouldShowMenu: !this.state.shouldShowMenu})
  }

  render() {
    const { isSideMenuEnabled } = this.props
    const { shouldShowMenu } = this.state

    return (
      <View style={styles.header}>
        <Logo />
        {isSideMenuEnabled &&
          <SideMenu
            shouldShowMenu={shouldShowMenu}
            toggleMenu={this.toggleMenu}
          />
        }
      </View >
    )
  }
}

Header.defaultProps = {
  isSideMenuEnabled: true
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.purple,
    padding: Sizes.base,
    ...Containers.rowContainer
  }
})