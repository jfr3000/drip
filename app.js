import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Home from './components/home'

import Calendar from './components/calendar'
import CycleDay from './components/cycle-day'
import Chart from './components/chart/chart'
import Settings from './components/settings'
import Stats from './components/stats'

import styles, { primaryColor } from './styles'

// this is until react native fixes this bugg, see
// https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const routes = {
  Home: createStackNavigator({Home, CycleDay}, {headerMode: 'none'}),
  Calendar: createStackNavigator({Calendar, CycleDay}, {headerMode: 'none'}),
  Chart: createStackNavigator({Chart, CycleDay}, {headerMode: 'none'}),
  Settings: { screen: Settings },
  Stats: { screen: Stats}
}

const config = {
  labeled: true,
  shifting: false,
  tabBarOptions: {
    style: {backgroundColor: primaryColor },
    labelStyle: styles.menuLabel
  }
}

export default createBottomTabNavigator(routes, config)