import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import { Colors, Spacing, Typography } from '../../styles'

const AppTextInput = ({ style, ...props }) => (
  <TextInput style={[styles.input, style]} {...props} />
)

AppTextInput.propTypes = {
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderColor: Colors.grey,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    color: Colors.greyDark,
    marginTop: Spacing.base,
    minWidth: '80%',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    ...Typography.mainText,
  },
})

export default AppTextInput
