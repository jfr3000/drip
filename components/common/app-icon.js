import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { Colors, Sizes } from '../../styles/redesign'

const AppIcon = ({ isCTA, name }) => {
  const style = isCTA ? styles.iconCTA : styles.icon

  return <Icon name={name} style={style}/>
}

AppIcon.propTypes = {
  isCTA: PropTypes.bool,
  name: PropTypes.string.isRequired
}

AppIcon.defaultProps = {
  isCTA: true
}

const styles = StyleSheet.create({
  icon: {
    color: 'black',
    fontSize: Sizes.subtitle
  },
  iconCTA: {
    color: Colors.orange,
    fontSize: Sizes.subtitle
  }
})

export default AppIcon