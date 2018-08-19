import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import styles, { iconStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Menu extends Component {
  makeMenuItem({ title, icon, componentName }) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigate(componentName)}
        style={{ alignItems: 'center' }}
      >
        <Icon name={icon} {...iconStyles.menuIcon} />
        <Text style={styles.menuText}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      this.props.symptomView ?
        placeActionButtons()
        :
        <View style={styles.menu}>
          {[
            {title: 'Home', icon: 'home', componentName: 'Home'},
            {title: 'Calendar', icon: 'calendar-range', componentName: 'Calendar'},
            {title: 'Chart', icon: 'chart-line', componentName: 'Chart'},
            {title: 'Stats', icon: 'chart-pie', componentName: 'Stats'},
            {title: 'Settings', icon: 'settings', componentName: 'Settings'},
          ].map(this.makeMenuItem.bind(this))}
        </View >
    )
  }
}
