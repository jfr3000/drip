import { createStackNavigator } from 'react-navigation'
import Home from './home'
import TemperatureList from './list'
import Datepicker from './datepicker'

export default createStackNavigator({
  home: { screen: Home },
  temperatureList: { screen: TemperatureList },
  datepicker: { screen: Datepicker }
})