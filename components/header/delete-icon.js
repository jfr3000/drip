import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Icon from 'react-native-vector-icons/AntDesign'

import styles, { iconStyles } from '../../styles'

export default function DeleteIcon({ handleDelete }) {

  return (
    <TouchableOpacity
      onPress={handleDelete}
      style={styles.headerDeleteButton}
    >
      <Icon
        name="delete"
        {...iconStyles.symptomHeaderIcons}
      />
    </TouchableOpacity>
  )
}

DeleteIcon.propTypes = {
  handleDelete: PropTypes.func,
}
