import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import MenuItem from './menu-item'

import { Containers } from '../../styles'
import { pages } from '../pages'
import { useTranslation } from 'react-i18next'

const Menu = ({ currentPage, navigate }) => {
  const menuItems = pages.filter((page) => page.isInMenu)

  const { t } = useTranslation(null, { keyPrefix: 'bottomMenu' })

  return (
    <View style={styles.container}>
      {menuItems.map(({ icon, labelKey, component }) => {
        return (
          <MenuItem
            isActive={component === currentPage}
            onPress={() => navigate(component)}
            icon={icon}
            key={labelKey}
            label={t(labelKey)}
          />
        )
      })}
    </View>
  )
}

Menu.propTypes = {
  currentPage: PropTypes.string,
  navigate: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    ...Containers.rowContainer,
  },
})

export default Menu
