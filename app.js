import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Home from './components/home'

import Calendar from './components/calendar'
import CycleDay from './components/cycle-day'
import Chart from './components/chart/chart'
import Settings from './components/settings'
import Stats from './components/stats'

// this is until react native fixes this bugg, see
// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const routes = {
  Home: { screen: Home },
  Calendar: createStackNavigator({Calendar, CycleDay}),
  Chart: createStackNavigator({Chart, CycleDay}),
  Settings: { screen: Settings },
  Stats: { screen: Stats}
}

const config = {
  labeled: true,
  shifting: false,
  backBehavior: 'none'
}

export default createBottomTabNavigator(routes, config)