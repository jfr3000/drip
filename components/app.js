import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import PropTypes from 'prop-types'

import { LocalDate } from 'js-joda'
import { connect } from 'react-redux'

import { getDate, setDate } from '../slices/date'
import { getNavigation, navigate, goBack } from '../slices/navigation'

import Header from './header'
import Menu from './menu'
import { viewsList, isSymptomView, isSettingsView } from './pages'

import { headerTitles } from '../i18n/en/labels'
import setupNotifications from '../lib/notifications'
import { closeDb, getCycleDay } from '../db'

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
      this.handleBackButtonPress
    )

    setupNotifications(this.props.navigate)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackButtonPress = () => {
    const { currentPage } = this.props.navigation

    if (currentPage === 'Home') {
      closeDb()
      return false
    }

    this.props.goBack()
    return true
  }

  render() {
    const { cycleDay } = this.state
    const { currentPage } = this.props.navigation

    const Page = viewsList[currentPage]
    const title = headerTitles[currentPage]

    const isSymptomEditView = isSymptomView(currentPage)
    const isSettingsSubView = isSettingsView(currentPage)
    const isCycleDayView = currentPage === 'CycleDay'

    return (
      <View style={{ flex: 1 }}>
        { !isSymptomEditView && !isCycleDayView &&
          <Header
            handleBack={isSettingsSubView ? this.handleBackButtonPress : null}
            title={title}
          />
        }

        <Page
          cycleDay={cycleDay}
          date={this.props.date}
          handleBackButtonPress={this.handleBackButtonPress}
        />

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