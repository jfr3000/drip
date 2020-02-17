import React from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { navigate } from '../../slices/navigation'

import styles from '../../styles/index'

import settingsLabels from '../../i18n/en/settings'

import AppText from '../app-text'

const labels = settingsLabels.menuTitles

const menu = [
  {title: labels.reminders, component: 'Reminders'},
  {title: labels.nfpSettings, component: 'NfpSettings'},
  {title: labels.dataManagement, component: 'DataManagement'},
  {title: labels.password, component: 'Password'},
  {title: labels.about, component: 'About'},
  {title: labels.license, component: 'License'}
]

const SettingsMenu = (props) => {
  return (
    <ScrollView>
      { menu.map(menuItem)}
    </ScrollView>
  )

  function menuItem(item) {
    return (
      <TouchableOpacity
        style={styles.framedSegment}
        key={item.title}
        onPress={() => props.navigate(item.component)}
      >
        <AppText>{item.title.toLowerCase()}</AppText>
      </TouchableOpacity>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    navigate: (page) => dispatch(navigate(page)),
  })
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsMenu)