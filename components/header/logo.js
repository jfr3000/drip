import React from 'react'
import { StyleSheet } from 'react-native'

import AppText from '../common/app-text'

import { Colors, Fonts, Sizes } from '../../styles'

const Logo = () => {
  return <AppText style={styles.logo}>drip.</AppText>
}

const styles = StyleSheet.create({
  logo: {
    color: Colors.turquoiseDark,
    fontFamily: Fonts.bold,
    fontSize: Sizes.title,
  },
})

export default Logo
