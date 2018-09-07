import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import Header from './header'
import Menu from './menu'
import Home from './home'
import Calendar from './calendar'
import CycleDay from './cycle-day/cycle-day-overview'
import symptomViews from './cycle-day/symptoms'
import Chart from './chart/chart'
import Settings from './settings'
import Stats from './stats'
import {headerTitles as titles} from './labels'
import setupNotifications from '../lib/notifications'

const isSymptomView = name => Object.keys(symptomViews).indexOf(name) > -1

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'Home'
    }
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress)
    setupNotifications(this.navigate)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  navigate = (pageName, props) => {
    const curr = this.state.currentPage
    if (navigatingToCycleDayFromMainMenuEntry(pageName, curr)) {
      this.cycleDayOrigin = curr
    }
    this.setState({currentPage: pageName, currentProps: props})
  }

  handleBackButtonPress = () => {
    if (this.state.currentPage === 'Home') return false
    if (isSymptomView(this.state.currentPage)) {
      this.navigate('CycleDay', { cycleDay: this.state.currentProps.cycleDay })
    } else if(this.state.currentPage === 'CycleDay') {
      this.navigate(this.cycleDayOrigin || 'Home')
      this.cycleDayOrigin = null
    } else {
      this.navigate('Home')
    }
    return true
  }

  render() {
    const page = {
      Home, Calendar, CycleDay, Chart, Settings, Stats, ...symptomViews
    }[this.state.currentPage]
    return (
      <View style={{flex: 1}}>

        {this.state.currentPage != 'CycleDay' && <Header title={titles[this.state.currentPage]} />}

        {React.createElement(page, {
          navigate: this.navigate,
          ...this.state.currentProps
        })}

        {!isSymptomView(this.state.currentPage) &&
          <Menu navigate={this.navigate} />
        }
      </View>
    )
  }
}

function navigatingToCycleDayFromMainMenuEntry(target, curr) {
  return target === 'CycleDay' && ['Home', 'Calendar', 'Chart'].indexOf(curr) > -1
}