import symptomViews from './cycle-day/symptoms'
import settingsViews from './settings'

import settingsLabels from '../i18n/en/settings'
const labels = settingsLabels.menuTitles

const symptomsPages = Object.keys(symptomViews).map(symptomView => ({
  component: symptomView,
  parent: 'CycleDay',
}))

export const isSymptomView =
  (page) => Object.keys(symptomViews).includes(page)

export const isSettingsView =
  (page) => Object.keys(settingsViews).includes(page)

export const pages = [
  {
    component: 'Home',
    icon: 'home',
    isInMenu: true,
    label: 'Home',
  },
  {
    component: 'Calendar',
    icon: 'calendar-range',
    isInMenu: true,
    label: 'Calendar',
    parent: 'Home',
  },
  {
    component: 'Chart',
    icon: 'chart-line',
    isInMenu: true,
    label: 'Chart',
    parent: 'Home',
  },
  {
    component: 'Stats',
    icon: 'chart-pie',
    isInMenu: true,
    label: 'Stats',
    parent: 'Home',
  },
  {
    children: Object.keys(settingsViews),
    component: 'SettingsMenu',
    icon: 'settings',
    isInMenu: true,
    label: 'Settings',
    parent: 'Home',
  },
  {
    component: 'Reminders',
    label: labels.reminders,
    parent: 'SettingsMenu',
  },
  {
    component: 'NfpSettings',
    label: labels.nfpSettings,
    parent: 'SettingsMenu',
  },
  {
    component: 'DataManagement',
    label: labels.dataManagement,
    parent: 'SettingsMenu',
  },
  {
    component: 'Password',
    label: labels.password,
    parent: 'SettingsMenu',
  },
  {
    component: 'About',
    label: labels.about,
    parent: 'SettingsMenu',
  },
  {
    component: 'License',
    label: labels.license,
    parent: 'SettingsMenu',
  },
  {
    component: 'CycleDay',
    parent: 'Home',
  },
  ...symptomsPages
]