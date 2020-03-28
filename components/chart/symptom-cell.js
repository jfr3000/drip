import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'
import config from '../../config'

const SymptomCell = ({
  height,
  symptom,
  symptomValue,
  isSymptomDataComplete
}) => {

  const shouldDrawDot = symptomValue !== false
  const styleParent = [styles.symptomRow, { height, width: config.columnWidth }]
  let styleChild

  if (shouldDrawDot) {
    const styleSymptom = styles.iconColors[symptom]
    const symptomColor = styleSymptom.shades[symptomValue]

    const isMucusOrCervix = (symptom === 'mucus') || (symptom === 'cervix')

    const backgroundColor = (isMucusOrCervix && !isSymptomDataComplete) ?
      'white' : symptomColor
    const borderWidth = (isMucusOrCervix && !isSymptomDataComplete) ? 2 : 0
    const borderColor = symptomColor
    styleChild = [styles.symptomDot, {
      backgroundColor,
      borderColor,
      borderWidth
    }]
  }

  return (
    <View style={styleParent} key={symptom}>
      {shouldDrawDot && <View style={styleChild} />}
    </View>
  )
}

SymptomCell.propTypes = {
  height: PropTypes.number,
  symptom: PropTypes.string,
  symptomValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  isSymptomDataComplete: PropTypes.bool,
}

export default SymptomCell
