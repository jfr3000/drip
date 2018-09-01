import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'
import { AppText } from '../app-text'

export default class RadioButton extends Component {
  render() {
    return (
      <View style={styles.radioButtonGroup}>
        {
          this.props.buttons.map(({ label, value }) => {
            const isActive = value === this.props.active
            return (
              <TouchableOpacity
                onPress={() => this.props.onSelect(value)}
                key={value}
                activeOpacity={1}
              >
                <View style={styles.radioButtonTextGroup}>
                  <View style={styles.radioButton}>
                    {isActive ?
                      <View style={styles.radioButtonActiveDot}/> : null}
                  </View>
                  <AppText>{label}</AppText>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}