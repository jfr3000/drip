import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import styles from '../../styles'
import { AppText } from '../app-text'

export default class SelectTabGroup extends Component {
  render() {
    return (
      <View style={styles.selectTabGroup}>
        {
          this.props.buttons.map(({ label, value }, i) => {
            let firstOrLastStyle
            if (i === this.props.buttons.length - 1) {
              firstOrLastStyle = styles.selectTabLast
            } else if (i === 0) {
              firstOrLastStyle = styles.selectTabFirst
            }
            let activeStyle
            const isActive = value === this.props.active
            if (isActive) activeStyle = styles.selectTabActive
            return (
              <TouchableOpacity
                onPress={() => this.props.onSelect(value)}
                key={value}
                activeOpacity={1}
              >
                <View style={styles.radioButtonTextGroup}>
                  <View style={[
                    styles.selectTab,
                    firstOrLastStyle,
                    activeStyle
                  ]}>
                    <AppText style={activeStyle}>{label}</AppText>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}