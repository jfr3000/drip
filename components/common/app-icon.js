import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { Sizes } from '../../styles'

const AppIcon = ({ color, name, style, ...props }) => {
  const iconStyle = [styles.icon, style, { color }]

  return <Icon name={name} style={iconStyle} {...props} />
}

AppIcon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}

AppIcon.defaultProps = {
  color: 'black',
}

const styles = StyleSheet.create({
  icon: {
    fontSize: Sizes.subtitle,
  },
})

export default AppIcon
