import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import AppPage from '../common/app-page'
import AppText from '../common/app-text'

import { connect } from 'react-redux'
import { navigate } from '../../slices/navigation'

import { Colors, Containers, Sizes, Spacing } from '../../styles/redesign'
import settingsLabels from '../../i18n/en/settings'

const { menuItems } = settingsLabels
const menu = [
  { ...menuItems.reminders, component: 'Reminders'},
  { ...menuItems.nfpSettings, component: 'NfpSettings'},
  { ...menuItems.dataManagement, component: 'DataManagement'},
  { ...menuItems.password, component: 'Password'}
]

const SettingsMenu = ({ navigate }) => {
  return (
    <AppPage title={settingsLabels.title}>
      {menu.map((menuItem, i) =>
        <MenuItem item={menuItem} i={i} navigate={navigate} key={i}/>
      )}
    </AppPage>
  )
}

SettingsMenu.propTypes = {
  navigate: PropTypes.func.isRequired
}

const MenuItem = ({ i, item, navigate }) => {
  const isLast = (menu.length === i + 1)
  const containerStyle = isLast ? styles.containerLast : styles.container

  return (
    <TouchableOpacity
      style={containerStyle}
      key={item.name}
      onPress={() => navigate(item.component)}
    >
      <View>
        <AppText style={styles.title}>{item.name}</AppText>
        {item.text.length > 0 && <AppText>{item.text}</AppText>}
      </View>
      <AppIcon name={'chevron-right'} isCTA/>
    </TouchableOpacity>
  )
}

MenuItem.propTypes = {
  i: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired
}

const menuItemContainer = {
  margin: Spacing.base,
  ...Containers.rowContainer
}

const styles = StyleSheet.create({
  container: {
    ...menuItemContainer,
    ...Containers.bottomBorder
  },
  containerLast: {
    ...menuItemContainer
  },
  title: {
    color: Colors.purple,
    fontSize: Sizes.subtitle
  },
})

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsMenu)