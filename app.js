import { createStackNavigator } from 'react-navigation'
import Home from './components/home'

import Calendar from './components/calendar'
import CycleDay from './components/cycle-day'
import Chart from './components/chart/chart'

// this is until react native fixes this bug, see https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default createStackNavigator({
  home: { screen: Home },
  calendar: { screen: Calendar },
  cycleDay: { screen: CycleDay },
  chart: { screen: Chart }
})
