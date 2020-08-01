import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import AppIcon from '../common/app-icon'
import AppText from '../common/app-text'

import { Colors, Containers, Sizes, Spacing } from '../../styles/redesign'
import { chart } from '../../i18n/en/labels'

const image = require('../../assets/swipe.png')

const Tutorial = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Image resizeMode='contain' source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <AppText>{chart.tutorial}</AppText>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.iconContainer}>
        <AppIcon name='cross' color={Colors.orange} />
      </TouchableOpacity>
    </View>
  )
}

Tutorial.propTypes = {
  onClose: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
    padding: Spacing.large
  },
  iconContainer: {
    alignSelf: 'flex-start',
    marginBottom: Sizes.base
  },
  image: {
    height: 40
  },
  textContainer: {
    width: '70%'
  }
})

export default Tutorial