import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'
import AppText from '../app-text'

export default class SelectBoxGroup extends Component {
  render() {
    return (
      <View style={styles.selectBoxSection}>
        {Object.keys(this.props.labels).map(key => {
          const style = [styles.selectBox]
          const textStyle = []
          if (this.props.optionsState[key]) {
            style.push(styles.selectBoxActive)
            textStyle.push(styles.selectBoxTextActive)
          }
          return (
            <TouchableOpacity
              onPress={() => this.props.onSelect(key)}
              key={key}
            >
              <View style={style}>
                <AppText style={textStyle}>{this.props.labels[key]}</AppText>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}