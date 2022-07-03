import settingsViews from './settings'

import settingsLabels from '../i18n/en/settings'
const labels = settingsLabels.menuItems

export const isSettingsView = (page) =>
  Object.keys(settingsViews).includes(page)

export const pages = [
  {
    component: 'Home',
    icon: 'home',
    label: 'Home',
  },
  {
    component: 'Calendar',
    icon: 'calendar',
    isInMenu: true,
    label: 'Calendar',
    parent: 'Home',
  },
  {
    component: 'Chart',
    icon: 'chart',
    isInMenu: true,
    label: 'Chart',
    parent: 'Home',
  },
  {
    component: 'Stats',
    icon: 'statistics',
    isInMenu: true,
    label: 'Stats',
    parent: 'Home',
  },
  {
    children: Object.keys(settingsViews),
    component: 'SettingsMenu',
    icon: 'settings',
    label: 'Settings',
    parent: 'Home',
  },
  {
    component: 'Reminders',
    label: labels.reminders.name,
    parent: 'SettingsMenu',
  },
  {
    component: 'NfpSettings',
    label: labels.nfpSettings.name,
    parent: 'SettingsMenu',
  },
  {
    component: 'DataManagement',
    label: labels.dataManagement.name,
    parent: 'SettingsMenu',
  },
  {
    component: 'Password',
    label: labels.password.name,
    parent: 'SettingsMenu',
  },
  {
    component: 'About',
    label: 'About',
    parent: 'SettingsMenu',
  },
  {
    component: 'License',
    label: 'License',
    parent: 'SettingsMenu',
  },
  {
    component: 'PrivacyPolicy',
    label: 'PrivacyPolicy',
    parent: 'SettingsMenu',
  },
  {
    component: 'CycleDay',
    parent: 'Home',
  },
]
