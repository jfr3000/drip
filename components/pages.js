import settingsViews from './settings'

export const pages = [
  {
    component: 'Home',
    icon: 'home',
  },
  {
    component: 'Calendar',
    icon: 'calendar',
    isInMenu: true,
    labelKey: 'calendar',
    parent: 'Home',
  },
  {
    component: 'Chart',
    icon: 'chart',
    isInMenu: true,
    labelKey: 'chart',
    parent: 'Home',
  },
  {
    component: 'Stats',
    icon: 'statistics',
    isInMenu: true,
    labelKey: 'stats',
    parent: 'Home',
  },
  {
    children: Object.keys(settingsViews),
    component: 'SettingsMenu',
    icon: 'settings',
    parent: 'Home',
  },
  {
    component: 'Reminders',
    parent: 'SettingsMenu',
  },
  {
    component: 'Customization',
    parent: 'SettingsMenu',
  },
  {
    component: 'DataManagement',
    parent: 'SettingsMenu',
  },
  {
    component: 'Password',
    parent: 'SettingsMenu',
  },
  {
    component: 'About',
    parent: 'SettingsMenu',
  },
  {
    component: 'License',
    parent: 'SettingsMenu',
  },
  {
    component: 'PrivacyPolicy',
    parent: 'SettingsMenu',
  },
  {
    component: 'CycleDay',
    parent: 'Home',
  },
]
