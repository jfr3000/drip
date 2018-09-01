import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'
import { AppText } from '../app-text'

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
          <AppText style={textStyle}>{this.props.label}</AppText>
        </View>
      </TouchableOpacity>
    )
  }
}