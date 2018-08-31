import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'

export default class SelectBox extends Component {
  render () {
    const style = [styles.selectBox]
    const textStyle = []
    if (this.props.value) {
      style.push(styles.selectBoxActive)
      textStyle.push(styles.selectBoxTextActive)
    }
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={style}>
          <Text style={textStyle}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}