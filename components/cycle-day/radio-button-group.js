import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'

export default class RadioButton extends Component {
  render() {
    return (
      <View style={styles.radioButtonGroup}>
        {
          this.props.buttons.map(({ label, value }) => {
            const circleStyle = [styles.radioButton]
            if (value === this.props.active) {
              circleStyle.push(styles.radioButtonActive)
            }
            return (
              <TouchableOpacity
                onPress={() => this.props.onSelect(value)}
                key={value}
                activeOpacity={1}
              >
                <View style={styles.radioButtonTextGroup}>
                  <View style={circleStyle} />
                  <Text>{label}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}