import React, { Component } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { LocalDate } from '@js-joda/core'

import Header from './header'
import Menu from './menu'
import { viewsList } from './views'
import { isSettingsView, pages } from './pages'

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
      currentPage: 'Home',
    }

    setupNotifications(this.navigate, this.setDate)
  }

  navigate = (page) => {
    this.setState({ currentPage: page })
  }

  setDate = (date) => {
    this.setState({ date })
  }

  goBack = () => {
    const { currentPage } = this.state

    if (currentPage === 'Home') {
      closeDb()
      BackHandler.exitApp()
    } else {
      const { parent } = pages.find((p) => p.component === currentPage)
      this.navigate(parent)
    }

    return true
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    const { goBack, restartApp } = this.props
    const { date, currentPage } = this.state
    const { navigate } = this

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
      navigate,
    }

    const pageProps = {
      date,
      setDate: this.setDate,
      isTemperatureEditView,
      navigate,
    }

    return (
      <View style={styles.container}>
        <Header {...headerProps} />
        <Page {...pageProps} restartApp={restartApp} />
        <Menu currentPage={currentPage} navigate={navigate} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
