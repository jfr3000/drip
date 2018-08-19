import React, { Component } from 'react'
import { View } from 'react-native'
import Header from './components/header'
import Menu from './components/menu'
import Home from './components/home'
import Calendar from './components/calendar'
import CycleDay from './components/cycle-day/cycle-day-overview'
import SymptomView from './components/cycle-day/symptoms'
import Chart from './components/chart/chart'
import Settings from './components/settings'
import Stats from './components/stats'

// this is until react native fixes this bugg, see
// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'Home'
    }
  }

  navigate(pageName, props) {
    this.setState({currentPage: pageName, currentProps: props})
  }

  render() {
    return (
      <View style={{height: '100%', justifyContent: 'space-between' }}>
        <View>
          {this.state.currentPage != 'CycleDay' && <Header title={this.state.currentPage}/>}
          <View>
            <CurrentPage
              page={this.state.currentPage}
              navigate={this.navigate.bind(this)}
              props={this.state.currentProps}
            />
          </View>
        </View>
        <Menu navigate={this.navigate.bind(this)} />
      </View>
    )
  }
}

class CurrentPage extends Component {
  render () {
    const page = {
      Home, Calendar, CycleDay, SymptomView, Chart, Settings, Stats
    }[this.props.page]
    const props = this.props.props || {}
    return React.createElement(page, {
      navigate: this.props.navigate,
      ...props
    })
  }
}