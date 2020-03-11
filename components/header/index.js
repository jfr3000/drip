import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import Title from './title'
import NavigationArrow from './navigation-arrow'
import DeleteIcon from './delete-icon'

import styles from '../../styles'

export default function Header({
  handleBack,
  handleNext,
  handleDelete,
  title,
  subtitle,
}) {

  return (
    <View style={styles.header}>
      <View style={styles.accentCircle} />
      { handleBack && <NavigationArrow handleBack={handleBack} /> }
      <Title title={title} subtitle={subtitle} />
      { handleNext && <NavigationArrow handleNext={handleNext} /> }
      { handleDelete && <DeleteIcon handleDelete={handleDelete} /> }
    </View >
  )
}

Header.propTypes = {
  handleBack: PropTypes.func,
  handleDelete: PropTypes.func,
  handleNext: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
}
