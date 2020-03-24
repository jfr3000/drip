import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import Logo from './logo'
import SideMenu from './side-menu'

import { Colors, Containers, Sizes } from '../../styles/redesign'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = { shouldShowMenu: false }
  }

  toggleMenu = () => {
    this.setState({ shouldShowMenu: !this.state.shouldShowMenu})
  }

  render() {
    const { shouldShowMenu } = this.state

    return (
      <View style={styles.header}>
        <Logo />
        <SideMenu shouldShowMenu={shouldShowMenu} onPress={this.toggleMenu}/>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.purple,
    padding: Sizes.base,
    ...Containers.rowContainer
  }
})