import React from 'react'
import PropTypes from 'prop-types'

import AppPage from '../common/app-page'
import MenuItem from './menu-item'

import settingsLabels from '../../i18n/en/settings'

const { menuItems } = settingsLabels
const menu = [
  { ...menuItems.reminders, component: 'Reminders' },
  { ...menuItems.nfpSettings, component: 'NfpSettings' },
  { ...menuItems.dataManagement, component: 'DataManagement' },
  { ...menuItems.password, component: 'Password' },
]

const SettingsMenu = ({ navigate }) => {
  return (
    <AppPage title={settingsLabels.title}>
      {menu.map((menuItem, i) => {
        const last = menu.length === i + 1

        return (
          <MenuItem item={menuItem} key={i} last={last} navigate={navigate} />
        )
      })}
    </AppPage>
  )
}

SettingsMenu.propTypes = {
  navigate: PropTypes.func.isRequired,
}

export default SettingsMenu
