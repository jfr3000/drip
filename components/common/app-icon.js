import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { Sizes } from '../../styles/redesign'

const AppIcon = ({ color, name }) => {
  const style = [styles.icon, { color }]

  return <Icon name={name} style={style}/>
}

AppIcon.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired
}

AppIcon.defaultProps = {
  isCTA: 'black'
}

const styles = StyleSheet.create({
  icon: {
    fontSize: Sizes.subtitle
  }
})

export default AppIcon