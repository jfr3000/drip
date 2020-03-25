import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { Colors, Spacing, Typography } from '../../styles/redesign'

const AppTextInput = ({ ...props }) => {
  return <TextInput style={styles.input} {...props} />
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
    paddingHorizontal: Spacing.base,
    ...Typography.mainText
  }
})

export default AppTextInput
