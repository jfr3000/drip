import React, { Component } from 'react'
import { View, BackHandler, ScrollView } from 'react-native'
import Header from './components/header'
import Menu from './components/menu'
import Home from './components/home'
import Calendar from './components/calendar'
import CycleDay from './components/cycle-day/cycle-day-overview'
import symptomViews from './components/cycle-day/symptoms'
import Chart from './components/chart/chart'
import Settings from './components/settings'
import Stats from './components/stats'

// this is until react native fixes this bugg, see
// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
import ActionButtonFooter from './components/cycle-day/symptoms/action-button-footer';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

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

  setActionButtonState(actionButtonInfo) {
    this.setState({actionButtonInfo})
  }

  unsetActionButtonState() {
    this.setState({actionButtonInfo: null})
  }

  render() {
    const page = {
      Home, Calendar, CycleDay, Chart, Settings, Stats, ...symptomViews
    }[this.state.currentPage]
    return (
      <View style={{height: '100%', justifyContent: 'space-between' }}>
        <View>
          {this.state.currentPage != 'CycleDay' && <Header title={this.state.currentPage}/>}
          <ScrollView>
            {React.createElement(page, {
              navigate: this.navigate.bind(this),
              setActionButtonState: this.setActionButtonState.bind(this),
              unsetActionButtonState: this.unsetActionButtonState.bind(this),
              ...this.state.currentProps
            })}
          </ScrollView>
        </View>
        {isSymptomView(this.state.currentPage) && this.state.actionButtonInfo ?
          <ActionButtonFooter
            {...this.state.actionButtonInfo}
            navigate={this.navigate.bind(this)}
          />
          :
          <Menu navigate={this.navigate.bind(this)}/>
        }
      </View>
    )
  }
}