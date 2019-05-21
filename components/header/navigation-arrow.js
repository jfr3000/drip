import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles, { iconStyles } from '../../styles'
import Icon from 'react-native-vector-icons/Entypo'

export default function NavigationArrow(props) {
  const iconName = {
    left: 'chevron-thin-left',
    right: 'chevron-thin-right'
  }[props.direction]
  const iconPosition = {
    left: 'navigationArrowLeft',
    right: 'navigationArrowRight'
  }[props.direction]
  let pressHandler
  if (props.goBack) {
    pressHandler = () => props.goBack()
  } else {
    pressHandler = () => {
      const target = props.direction === 'left' ? 'before' : 'after'
      props.goToCycleDay(target)
    }
  }
  return (
    <TouchableOpacity
      style={[styles.navigationArrow, styles[iconPosition]]}
      onPress={pressHandler}
    >
      <Icon
        name={iconName}
        {...iconStyles.navigationArrow}
      />
    </TouchableOpacity>
  )
}