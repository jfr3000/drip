import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import DripIcon from '../../assets/drip-icons'

import styles from './styles'

const SymptomIcon = ({ symptom, height }) => {
  return (
    <View style={styles.symptomIcon} width={styles.yAxis.width} height={height}>
      <DripIcon
        size={16}
        name={`drip-icon-${symptom}`}
        color={styles.iconColors[symptom].color}
      />
    </View>
  )
}

SymptomIcon.propTypes = {
  height: PropTypes.number,
  symptom: PropTypes.string,
}

export default SymptomIcon
