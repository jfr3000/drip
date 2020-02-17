import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import PropTypes from 'prop-types'

import { LocalDate } from 'js-joda'
import { connect } from 'react-redux'

import { getDate, setDate } from '../slices/date'
import { getNavigation, navigate, goBack } from '../slices/navigation'

import Header from './header'
import Menu from './menu'
import { viewsList } from './views'
import { isSymptomView, isSettingsView } from './pages'

import { headerTitles } from '../i18n/en/labels'
import setupNotifications from '../lib/notifications'
import { getCycleDay } from '../db'

class App extends Component {

  static propTypes = {
    date: PropTypes.string,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.todayDateString = LocalDate.now().toString()
    props.setDate(this.todayDateString)

    this.state = {
      cycleDay: getCycleDay(this.todayDateString),
    }

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      props.goBack
    )

    setupNotifications(this.props.navigate)
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

    const { cycleDay } = this.state

    const Page = viewsList[currentPage]
    const title = headerTitles[currentPage]

    const isSymptomEditView = isSymptomView(currentPage)
    const isSettingsSubView = isSettingsView(currentPage)
    const isCycleDayView = currentPage === 'CycleDay'

    const headerProps = {
      title,
      handleBack: isSettingsSubView ? goBack : null,
    }

    const pageProps = {
      cycleDay,
      date,
      handleBackButtonPress: goBack,
    }

    return (
      <View style={{ flex: 1 }}>
        {
          !isSymptomEditView &&
          !isCycleDayView &&
          <Header { ...headerProps } />
        }

        <Page { ...pageProps } />

        { !isSymptomEditView && <Menu /> }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state),
    navigation: getNavigation(state)
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    setDate: (date) => dispatch(setDate(date)),
    navigate: (page) => dispatch(navigate(page)),
    goBack: () => dispatch(goBack()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)