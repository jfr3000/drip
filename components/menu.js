import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import styles, { iconStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Menu extends Component {
  makeMenuItem = ({ title, icon, onPress}, i) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.menuItem}
        key={i.toString()}
      >
        <Icon name={icon} {...iconStyles.menuIcon} />
        <Text style={styles.menuText}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

  goTo(componentName) {
    this.props.navigate(componentName)
  }

  render() {
    return (
      <View style={styles.menu}>
        {[
          { title: 'Home', icon: 'home', onPress: () => this.goTo('Home') },
          { title: 'Calendar', icon: 'calendar-range', onPress: () => this.goTo('Calendar') },
          { title: 'Chart', icon: 'chart-line', onPress: () => this.goTo('Chart') },
          { title: 'Stats', icon: 'chart-pie', onPress: () => this.goTo('Stats') },
          { title: 'Settings', icon: 'settings', onPress: () => this.goTo('Settings') },
        ].map(this.makeMenuItem)}
      </View >
    )
  }
}
