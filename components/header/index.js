import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'

import AppText from '../common/app-text'
import SideMenu from './side-menu'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { Colors, Containers, Fonts, Sizes } from '../../styles/redesign'

class Header extends Component {

  static propTypes = {
    navigate: PropTypes.func.isRequired
  }

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
        <DripIcon navigate={this.props.navigate}/>
        <SideMenu
          shouldShowMenu={shouldShowMenu}
          onPress={this.toggleMenu}
        />
      </View >
    )
  }
}

const DripIcon = ({ navigate }) => {
  return(
    <TouchableOpacity onPress={() => navigate('Home')}>
      <AppText style={styles.icon}>drip.</AppText>
    </TouchableOpacity>
  )
}

DripIcon.propTypes = {
  navigate: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.purple,
    padding: Sizes.base,
    ...Containers.rowContainer
  },
  icon: {
    color: Colors.tourquiseDark,
    fontFamily: Fonts.bold,
    fontSize: Sizes.title
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
)(Header)