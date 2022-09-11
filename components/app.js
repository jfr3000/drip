import React, { useState, useEffect } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { LocalDate } from '@js-joda/core'

import Header from './header'
import Menu from './menu'
import { viewsList } from './views'
import { pages } from './pages'

import setupNotifications from '../lib/notifications'
import { closeDb } from '../db'

const App = ({ restartApp }) => {
  const [date, setDate] = useState(LocalDate.now().toString())
  const [currentPage, setCurrentPage] = useState('Home')
  const goBack = () => {
    if (currentPage === 'Home') {
      closeDb()
      BackHandler.exitApp()
    } else {
      const { parent } = pages.find((p) => p.component === currentPage)

      setCurrentPage(parent)
    }

    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      goBack
    )

    return () => backHandler.remove()
  })

  useEffect(() => setupNotifications(setCurrentPage, setDate), [])

  const Page = viewsList[currentPage]
  const isTemperatureEditView = currentPage === 'TemperatureEditView'
  const headerProps = { navigate: setCurrentPage }
  const pageProps = {
    date,
    setDate,
    isTemperatureEditView,
    navigate: setCurrentPage,
  }

  return (
    <View style={styles.container}>
      <Header {...headerProps} />
      <Page {...pageProps} restartApp={restartApp} />
      <Menu currentPage={currentPage} navigate={setCurrentPage} />
    </View>
  )
}

App.propTypes = {
  restartApp: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
