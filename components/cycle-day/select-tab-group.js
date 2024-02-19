import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Containers } from '../../styles'
import labels from '../../i18n/en/settings'

export default function SelectTabGroup({ activeButton, buttons, onSelect }) {
  const oneTimeTransformIntoNumber =
    typeof activeButton === 'boolean' && Number(activeButton)
  const isSecondarySymptomSwitch =
    buttons[0]['label'] === labels.useCervixAsSecondarySymptom.mucus
  return (
    <View style={styles.container}>
      {buttons.map(({ label, value }, i) => {
        const isActive =
          value === activeButton || value === oneTimeTransformIntoNumber
        const boxStyle = [
          styles.box,
          isActive && styles.boxActive,
          isSecondarySymptomSwitch && styles.purpleBox,
          isSecondarySymptomSwitch && isActive && styles.activePurpleBox,
        ]
        const textStyle = [
          styles.text,
          isSecondarySymptomSwitch && styles.purpleText,
          isActive && styles.textActive,
        ]

        return (
          <TouchableOpacity
            onPress={() => onSelect(value)}
            key={i}
            style={boxStyle}
          >
            <AppText style={textStyle}>{label}</AppText>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

SelectTabGroup.propTypes = {
  activeButton: PropTypes.number,
  buttons: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  box: {
    ...Containers.box,
  },
  boxActive: {
    ...Containers.boxActive,
  },
  container: {
    ...Containers.selectGroupContainer,
  },
  text: {
    color: Colors.orange,
  },
  textActive: {
    color: 'white',
  },
  purpleBox: {
    borderColor: Colors.purple,
  },
  activePurpleBox: {
    backgroundColor: Colors.purple,
  },
  purpleText: {
    color: Colors.purple,
  },
})
