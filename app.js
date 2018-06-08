import { createStackNavigator } from 'react-navigation'
import Home from './home'
import TemperatureList from './list'
import Calendar from './calendar'
import DayView from './day-view'
import Bleeding from './bleeding'

export default createStackNavigator({
  home: { screen: Home },
  temperatureList: { screen: TemperatureList },
  calendar: { screen: Calendar },
  dayView: { screen: DayView },
  bleeding: { screen: Bleeding }
})