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
            const isActive = value === this.props.active
            const circleStyle = [styles.radioButton]
            return (
              <TouchableOpacity
                onPress={() => this.props.onSelect(value)}
                key={value}
                activeOpacity={1}
              >
                <View style={styles.radioButtonTextGroup}>
                  <View style={circleStyle}>
                    {isActive ?
                      <View style={styles.radioButtonActiveDot}/> : null}
                  </View>
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