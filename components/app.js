import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import Header from './header'
import Menu from './menu'
import Home from './home'
import Calendar from './calendar'
import CycleDay from './cycle-day/cycle-day-overview'
import symptomViews from './cycle-day/symptoms'
import Chart from './chart/chart'
import SettingsMenu from './settings/settings-menu'
import settingsViews from './settings'
import Stats from './stats'
import {headerTitles, menuTitles} from '../i18n/en/labels'
import InfoSymptom from './cycle-day/symptoms/info-symptom'
import setupNotifications from '../lib/notifications'

// design wants everyhting lowercased, but we don't
// have CSS pseudo properties
const headerTitlesLowerCase = Object.keys(headerTitles).reduce((acc, curr) => {
  acc[curr] = headerTitles[curr].toLowerCase()
  return acc
}, {})

const HOME_PAGE = 'Home'
const INFO_SYMPTOM_PAGE = 'InfoSymptom'
const CYCLE_DAY_PAGE = 'CycleDay'
const SETTINGS_MENU_PAGE = 'SettingsMenu'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: HOME_PAGE
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress)
    setupNotifications(this.navigate)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  navigate = (pageName, props) => {
    const { currentPage } = this.state
    // for the back button to work properly, we want to
    // remember two origins: which menu item we came from
    // and from where we navigated to the symptom view (day
    // view or home page)
    if (this.isMenuItem()) {
      this.menuOrigin = currentPage
    }
    if (!this.isSymptomView() && !this.isInfoSymptomView()) {
      this.originForSymptomView = currentPage
    }
    this.setState({ currentPage: pageName, currentProps: props })
  }

  handleBackButtonPress = () => {
    const { currentPage, currentProps } = this.state
    if (currentPage === HOME_PAGE) return false
    if (this.isSymptomView()) {
      this.navigate(
        this.originForSymptomView, { date: currentProps.date }
      )
    } else if (this.isSettingsView()) {
      this.navigate(SETTINGS_MENU_PAGE)
    } else if (currentPage === CYCLE_DAY_PAGE) {
      this.navigate(this.menuOrigin)
    } else if (this.isInfoSymptomView()) {
      const { date, cycleDay, symptomView } = currentProps
      this.navigate(
        symptomView, { date, cycleDay })
    } else {
      this.navigate(HOME_PAGE)
    }
    return true
  }

  isMenuItem() {
    return Object.keys(menuTitles).includes(this.state.currentPage)
  }

  isSymptomView() {
    return Object.keys(symptomViews).includes(this.state.currentPage)
  }

  isInfoSymptomView() {
    return this.state.currentPage === INFO_SYMPTOM_PAGE
  }

  isSettingsView() {
    return Object.keys(settingsViews).includes(this.state.currentPage)
  }

  isDefaultView() {
    const { currentPage } = this.state
    return this.isMenuItem(currentPage) || currentPage === SETTINGS_MENU_PAGE
  }

  render() {
    const { currentPage, currentProps } = this.state
    const pages = {
      Home,
      Calendar,
      CycleDay,
      Chart,
      InfoSymptom,
      SettingsMenu,
      ...settingsViews,
      Stats,
      ...symptomViews
    }
    const Page = pages[currentPage]
    const title = headerTitlesLowerCase[currentPage]

    return (
      <View style={{flex: 1}}>
        {this.isDefaultView() &&
          <Header title={title} />
        }
        {(this.isInfoSymptomView() || this.isSettingsView()) &&
          <Header
            title={title}
            showBackButton={true}
            goBack={this.handleBackButtonPress}
          />
        }

        <Page
          navigate={this.navigate}
          {...currentProps}
          handleBackButtonPress={this.handleBackButtonPress}
        />

        {!this.isSymptomView() &&
          <Menu navigate={this.navigate} currentPage={currentPage} />
        }
      </View>
    )
  }
}
