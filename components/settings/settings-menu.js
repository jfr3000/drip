import React from 'react'

import AppPage from '../common/app-page'
import MenuItem from './menu-item'

import settingsLabels from '../../i18n/en/settings'

const { menuItems } = settingsLabels
const menu = [
  { ...menuItems.reminders, component: 'Reminders'},
  { ...menuItems.nfpSettings, component: 'NfpSettings'},
  { ...menuItems.dataManagement, component: 'DataManagement'},
  { ...menuItems.password, component: 'Password'}
]

const SettingsMenu = () => {
  return (
    <AppPage title={settingsLabels.title}>
      {menu.map((menuItem, i) => {
        const last = (menu.length === i + 1)

        return <MenuItem item={menuItem} key={i} last={last}/>
      }
      )}
    </AppPage>
  )
}

export default SettingsMenu