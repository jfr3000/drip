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
          <Text
            style={styles.dateHeader}
            onPress={() => this.props.navigate('Home')}
          >
            {'Home'}
          </Text>
          <Text
            style={styles.dateHeader}
            onPress={() => this.props.navigate('Calendar')}
          >
            {'Calendar'}
          </Text>
          <Text
            style={styles.dateHeader}
            onPress={() => this.props.navigate('Settings')}
          >
            {'Settings'}
          </Text>
        </View >
    )
  }
}

function placeActionButtons() {}