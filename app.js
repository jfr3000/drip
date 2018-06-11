import { createStackNavigator } from 'react-navigation'
import Home from './home'
import TemperatureList from './list'
import Calendar from './calendar'
import DayView from './day-view'
import Bleeding from './bleeding'

// this is until react native fixes this bug, see https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default createStackNavigator({
  home: { screen: Home },
  temperatureList: { screen: TemperatureList },
  calendar: { screen: Calendar },
  dayView: { screen: DayView },
  bleeding: { screen: Bleeding }
})