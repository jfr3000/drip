import Home from './home'
import Calendar from './calendar'
import CycleDay from './cycle-day/cycle-day-overview'
import symptomViews from './cycle-day/symptoms'
import Chart from './chart/chart'
import SettingsMenu from './settings/settings-menu'
import settingsViews from './settings'
import Stats from './stats'

export const pagesList = {
  Home,
  Calendar,
  CycleDay,
  Chart,
  SettingsMenu,
  ...settingsViews,
  Stats,
  ...symptomViews
}

export const isSymptomView =
  (page) => Object.keys(symptomViews).includes(page)

export const isSettingsView =
  (page) => Object.keys(settingsViews).includes(page)