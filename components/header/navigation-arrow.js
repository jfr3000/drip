import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Entypo'

import styles, { iconStyles } from '../../styles'

export default function NavigationArrow({ handleBack, handleNext }) {
  const navigationDirection = handleBack ? 'Left' : 'Right'
  return (
    <TouchableOpacity
      style={[
        styles.navigationArrow,
        styles[`navigationArrow${navigationDirection}`]
      ]}
      onPress={ handleBack || handleNext }
      testID={ handleBack ? 'backButton' : 'nextButton'}
    >
      <Icon
        name={`chevron-thin-${navigationDirection.toLowerCase()}`}
        {...iconStyles.navigationArrow}
      />
    </TouchableOpacity>
  )
}

NavigationArrow.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
}