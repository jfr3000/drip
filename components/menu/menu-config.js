import settingsViews from '../settings'

export const menuItems = [
  {
    labelKey: 'Home',
    icon: 'home',
    component: 'Home',
  },
  {
    labelKey: 'Calendar',
    icon: 'calendar-range',
    component: 'Calendar',
  },
  {
    labelKey: 'Chart',
    icon: 'chart-line',
    component: 'Chart',
  },
  {
    labelKey: 'Stats',
    icon: 'chart-pie',
    component: 'Stats',
  },
  {
    labelKey: 'Settings',
    icon: 'settings',
    component: 'SettingsMenu',
    children: Object.keys(settingsViews),
  }
]