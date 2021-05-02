import Home from './Home'
import Calendar from './calendar'
import CycleDay from './cycle-day/cycle-day-overview'
import Chart from './chart/chart'
import SettingsMenu from './settings/settings-menu'
import settingsViews from './settings'
import Stats from './stats'

export const viewsList = {
  Home,
  Calendar,
  CycleDay,
  TemperatureEditView: CycleDay,
  Chart,
  SettingsMenu,
  ...settingsViews,
  Stats,
}
