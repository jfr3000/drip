import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'

import AppIcon from './app-icon'
import AppText from './app-text'

import { Colors, Fonts, Sizes, Spacing } from '../../styles'

const Button = ({
  children,
  iconName,
  isCTA,
  isSmall,
  onPress,
  testID,
  ...props
}) => {
  const buttonStyle = isCTA ? styles.cta : styles.regular
  const textCTA = isCTA ? styles.buttonTextBold : styles.buttonTextRegular
  const textStyle = [textCTA, isSmall ? textSmall : text]

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      testID={testID}
      {...props}
    >
      <AppText style={textStyle}>{children}</AppText>
      {iconName && <AppIcon color={Colors.orange} name={iconName} />}
    </TouchableOpacity>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  iconName: PropTypes.string,
  isCTA: PropTypes.bool,
  isSmall: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string,
}

Button.defaultProps = {
  isSmall: true,
}

const text = {
  padding: Spacing.base,
  textTransform: 'uppercase',
}

const textSmall = {
  fontSize: Sizes.small,
  padding: Spacing.small,
  textTransform: 'uppercase',
}

const button = {
  alignItems: 'center',
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: Spacing.base,
  paddingHorizontal: Spacing.tiny,
  minWidth: '15%',
}

const styles = StyleSheet.create({
  regular: {
    ...button,
  },
  cta: {
    backgroundColor: Colors.orange,
    borderRadius: 25,
    ...button,
  },
  buttonTextBold: {
    color: 'white',
    fontFamily: Fonts.bold,
  },
  buttonTextRegular: {
    color: Colors.greyDark,
    fontFamily: Fonts.main,
  },
})

export default Button
