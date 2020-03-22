import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import Button from './common/button'

import styles from '../styles'

const HomeElement = ({ children, onPress, buttonColor, buttonLabel }) => {
  return (
    <View
      onPress={ onPress }
      style={ styles.homeElement }
    >
      <View style={styles.homeIconAndText}>
        {children[0]}
        {children[1]}
      </View>

      <View style={{paddingLeft: 15}}>
        {children.slice(2)}
        <Button
          style={styles.homeButton}
          onPress={ onPress }
          backgroundColor={ buttonColor }>
          { buttonLabel }
        </Button>
      </View>
    </View>
  )
}

HomeElement.propTypes = {
  buttonColor: PropTypes.string,
  buttonLabel: PropTypes.string,
  children: PropTypes.node,
  onPress: PropTypes.func,
}

export default HomeElement
