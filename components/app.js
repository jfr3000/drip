import React, { Component } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { getDate } from '../slices/date'
import { getNavigation, navigate, goBack } from '../slices/navigation'

import Header from './header'
import Menu from './menu'
import { viewsList } from './views'
import { isSettingsView } from './pages'

import { headerTitles } from '../i18n/en/labels'
import setupNotifications from '../lib/notifications'
import { getCycleDay, closeDb } from '../db'

class App extends Component {

  static propTypes = {
    date: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.goBack
    )

    setupNotifications(this.props.navigate)
  }

  goBack = () => {
    const { currentPage } = this.props.navigation

    if (currentPage === 'Home') {
      closeDb()
      BackHandler.exitApp()
    } else {
      this.props.goBack()
    }

    return true
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    const { date, navigation, goBack } = this.props
    const { currentPage } = navigation

    if (!currentPage) {
      return false
    }

    const Page = viewsList[currentPage]
    const title = headerTitles[currentPage]

    const isSettingsSubView = isSettingsView(currentPage)

    const headerProps = {
      title,
      handleBack: isSettingsSubView ? goBack : null,
    }

    const pageProps = {
      cycleDay: date && getCycleDay(date),
      date,
    }

    return (
      <View style={styles.container}>
        <Header { ...headerProps } />
        <Page { ...pageProps } />
        <Menu />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
    navigation: getNavigation(state)
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
    goBack: () => dispatch(goBack()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
