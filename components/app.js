import React, { Component } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { LocalDate } from '@js-joda/core'

import { getNavigation, navigate, goBack } from '../slices/navigation'

import Header from './header'
import Menu from './menu'
import { viewsList } from './views'
import { isSettingsView } from './pages'

import { headerTitles } from '../i18n/en/labels'
import setupNotifications from '../lib/notifications'
import { closeDb } from '../db'

class App extends Component {
  static propTypes = {
    date: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    navigate: PropTypes.func,
    setDate: PropTypes.func,
    goBack: PropTypes.func,
    restartApp: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.goBack
    )

    this.state = {
      date: LocalDate.now().toString(),
    }

    setupNotifications(this.props.navigate, this.props.setDate)
  }

  setDate = (date) => {
    this.setState({ date })
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
    const { navigation, goBack, restartApp } = this.props
    const { date } = this.state
    const { currentPage } = navigation

    if (!currentPage) {
      return false
    }

    const Page = viewsList[currentPage]
    const title = headerTitles[currentPage]

    const isSettingsSubView = isSettingsView(currentPage)
    const isTemperatureEditView = currentPage === 'TemperatureEditView'

    const headerProps = {
      title,
      handleBack: isSettingsSubView ? goBack : null,
    }

    const pageProps = {
      date,
      setDate: this.setDate,
      isTemperatureEditView,
    }

    return (
      <View style={styles.container}>
        <Header {...headerProps} />
        <Page {...pageProps} restartApp={restartApp} />
        <Menu />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => {
  return {
    navigation: getNavigation(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (page) => dispatch(navigate(page)),
    goBack: () => dispatch(goBack()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
