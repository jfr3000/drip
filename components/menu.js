import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import styles, { iconStyles } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Menu extends Component {
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
          ].map(makeMenuItem)}
        </View >
    )
  }
}

function makeMenuItem({title, icon, componentName}) {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon name={icon} {...iconStyles.menuIcon}/>
      <Text
        style={styles.menuText}
        onPress={() => this.props.navigate(componentName)}
      >
        {title}
      </Text>
    </View>
  )
}