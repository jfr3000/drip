import React from 'react'
import PropTypes from 'prop-types'

import AppPage from '../common/app-page'
import MenuItem from './menu-item'

import { useTranslation } from 'react-i18next'

const menuItems = [
  { label: 'customization', componentName: 'Customization' },
  { label: 'reminders', componentName: 'Reminders' },
  { label: 'dataManagement', componentName: 'DataManagement' },
  { label: 'password', componentName: 'Password' },
]

const SettingsMenu = ({ navigate }) => {
  const { t } = useTranslation()
  return (
    <AppPage title={t('hamburgerMenu.settings.title')}>
      {menuItems.map((menuItem, i) => {
        const last = menuItems.length === i + 1

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
