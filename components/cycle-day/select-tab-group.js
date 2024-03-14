import React from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Containers } from '../../styles'
import labels from '../../i18n/en/settings'

export default function SelectTabGroup({
  activeButton,
  buttons,
  onSelect,
  disabled,
}) {
  // TODO https://gitlab.com/bloodyhealth/drip/-/issues/707
  const oneTimeTransformIntoNumber =
    typeof activeButton === 'boolean' && Number(activeButton)
  const isSecondarySymptomSwitch =
    buttons[0]['label'] === labels.secondarySymptom.mucus

  // Disable is only used for secondarySymptom in customization, if more come up maybe consider more tidy solution
  const showDisabledAlert = (label) => {
    if (label === 'cervix' || label === 'mucus') {
      Alert.alert(
        labels.secondarySymptom.disabled.title,
        labels.secondarySymptom.disabled.message
      )
    }
  }

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
          disabled && styles.inActiveBox,
        ]
        const textStyle = [
          styles.text,
          isSecondarySymptomSwitch && styles.purpleText,
          isActive && styles.textActive,
          disabled && styles.greyText,
        ]

        return (
          <TouchableOpacity
            onPress={() =>
              !disabled ? onSelect(value) : showDisabledAlert(label)
            }
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
  disabled: PropTypes.bool,
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
  greyText: {
    color: Colors.grey,
  },
  inActiveBox: {
    borderColor: Colors.grey,
    backgroundColor: Colors.turquoiseLight,
  },
})
