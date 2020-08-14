import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Containers } from '../../styles/redesign'

export default function SelectTabGroup({ activeButton, buttons, onSelect }) {
  return (
    <View style={styles.container}>
      {
        buttons.map(({ label, value }, i) => {
          const isActive = value === activeButton
          const boxStyle = [styles.box, isActive && styles.boxActive]
          const textStyle = [styles.text, isActive && styles.textActive]

          return (
            <TouchableOpacity
              onPress={() => onSelect(value)}
              key={i}
              style={boxStyle}
            >
              <AppText style={textStyle}>{label}</AppText>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

SelectTabGroup.propTypes = {
  activeButton: PropTypes.number,
  buttons: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  box: {
    ...Containers.box
  },
  boxActive: {
    ...Containers.boxActive
  },
  container: {
    ...Containers.selectGroupContainer
  },
  text: {
    color: Colors.orange
  },
  textActive: {
    color: 'white'
  }
})