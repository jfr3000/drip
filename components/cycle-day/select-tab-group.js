import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'

import AppText from '../app-text'

import styles from '../../styles'

export default function SelectTabGroup({ active, buttons, onSelect }) {
  return (
    <View style={styles.selectTabGroup}>
      {
        buttons.map(({ label, value }, i) => {
          let firstOrLastStyle
          if (i === buttons.length - 1) {
            firstOrLastStyle = styles.selectTabLast
          } else if (i === 0) {
            firstOrLastStyle = styles.selectTabFirst
          }
          let activeStyle
          const isActive = value === active
          if (isActive) activeStyle = styles.selectTabActive
          return (
            <TouchableOpacity
              onPress={() => onSelect(isActive ? null : value)}
              key={i}
              activeOpacity={1}
            >
              <View>
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

SelectTabGroup.propTypes = {
  active: PropTypes.number,
  buttons: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}