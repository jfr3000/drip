import { createStackNavigator } from 'react-navigation'
import Home from './home'
import TemperatureList from './list'
import Datepicker from './datepicker'
import DayView from './day-view'
import Bleeding from './bleeding'

export default createStackNavigator({
  home: { screen: Home },
  temperatureList: { screen: TemperatureList },
  datepicker: { screen: Datepicker },
  dayView: { screen: DayView },
  bleeding: { screen: Bleeding }
})