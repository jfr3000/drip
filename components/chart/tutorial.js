import React from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, View } from 'react-native'

import AppText from '../common/app-text'
import CloseIcon from '../common/close-icon'

import { Containers, Spacing } from '../../styles'
import { useTranslation } from 'react-i18next'

const image = require('../../assets/swipe.png')

const Tutorial = ({ onClose }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <AppText>{t('chart.tutorial')}</AppText>
      </View>
      <CloseIcon onClose={onClose} />
    </View>
  )
}

Tutorial.propTypes = {
  onClose: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    ...Containers.rowContainer,
    padding: Spacing.large,
  },
  image: {
    height: 40,
  },
  textContainer: {
    width: '70%',
  },
})

export default Tutorial
