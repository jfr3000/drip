import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'
import { AppText } from '../app-text'

export default class SelectBoxGroup extends Component {
  render() {
    return (
      <View flexDirection='row' flexWrap='wrap'>
        {this.props.data.map(({ label, stateKey }) => {
          const style = [styles.selectBox]
          const textStyle = []
          if (this.props.optionsState[stateKey]) {
            style.push(styles.selectBoxActive)
            textStyle.push(styles.selectBoxTextActive)
          }
          return (
            <TouchableOpacity
              onPress={() => this.props.onSelect(stateKey)}
              key={stateKey}
            >
              <View style={style}>
                <AppText style={textStyle}>{label}</AppText>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}