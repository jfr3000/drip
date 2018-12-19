import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import styles, { iconStyles, secondaryColor } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Menu extends Component {
  makeMenuItem = ({ title, icon, onPress}, i) => {
    const styleActive = (this.props.currentPage.toLowerCase() === title) ?
      {color: secondaryColor} : {}
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.menuItem}
        key={i.toString()}
      >
        <Icon name={icon} {...iconStyles.menuIcon} {...styleActive} />
        <Text style={[styles.menuText, styleActive]}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

  goTo(componentName) {
    this.props.navigate(componentName)
  }

  render() {
    const t = this.props.titles
    return (
      <View style={styles.menu}>
        {[
          { title: t.Home, icon: 'home', onPress: () => this.goTo('Home') },
          { title: t.Calendar, icon: 'calendar-range', onPress: () => this.goTo('Calendar') },
          { title: t.Chart, icon: 'chart-line', onPress: () => this.goTo('Chart') },
          { title: t.Stats, icon: 'chart-pie', onPress: () => this.goTo('Stats') },
          { title: t.Settings, icon: 'settings', onPress: () => this.goTo('SettingsMenu') },
        ].map(this.makeMenuItem)}
      </View >
    )
  }
}
