import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'
import CloseIcon from '../common/close-icon'

import { Containers, Spacing } from '../../styles'
import { chart } from '../../i18n/en/labels'

const image = require('../../assets/swipe.png')

const Tutorial = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Image resizeMode='contain' source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <AppText>{chart.tutorial}</AppText>
      </View>
      <CloseIcon onClose={onClose} />
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
  image: {
    height: 40
  },
  textContainer: {
    width: '70%'
  }
})

export default Tutorial