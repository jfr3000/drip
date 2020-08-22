import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Containers } from '../../styles'

const SelectBoxGroup = ({ labels, optionsState, onSelect }) => {
  return (
    <View style={styles.container}>
      {Object.keys(labels).map(key => {
        const isActive = optionsState[key]
        const boxStyle = [styles.box, isActive && styles.boxActive]
        const textStyle = [styles.text, isActive && styles.textActive]

        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(key)}
            style={boxStyle}
          >
            <AppText style={textStyle}>{labels[key]}</AppText>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

SelectBoxGroup.propTypes = {
  labels: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  optionsState: PropTypes.object.isRequired
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

export default SelectBoxGroup
