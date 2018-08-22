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

const isSymptomView = name => Object.keys(symptomViews).indexOf(name) > -1

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'Home'
    }

    const handleBackButtonPress = function() {
      if (this.state.currentPage === 'Home') return false
      if (isSymptomView(this.state.currentPage)) {
        this.navigate('CycleDay', {cycleDay: this.state.currentProps.cycleDay})
      } else {
        this.navigate('Home')
      }
      return true
    }.bind(this)

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  navigate(pageName, props) {
    this.setState({currentPage: pageName, currentProps: props})
  }

  render() {
    const page = {
      Home, Calendar, CycleDay, Chart, Settings, Stats, ...symptomViews
    }[this.state.currentPage]
    return (
      <View style={{flex: 1}}>

        {this.state.currentPage != 'CycleDay' && <Header title={titles[this.state.currentPage]} />}

        {React.createElement(page, {
          navigate: this.navigate.bind(this),
          ...this.state.currentProps
        })}

        {!isSymptomView(this.state.currentPage) &&
          <Menu navigate={this.navigate.bind(this)} />
        }
      </View>
    )
  }
}