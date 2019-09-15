import React from 'react'
import { View, Text} from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../styles'

export default function Title({ title, subtitle }) {

  if (subtitle !== undefined) {
    return (
      <View>
        <Text style={styles.dateHeader} testID='headerTitle'>
          {title}
        </Text>
        { subtitle &&
          <Text style={styles.cycleDayNumber} testID='headerSubtitle'>
            {subtitle}
          </Text>
        }
      </View>
    )
  }

  return <Text testID='headerTitle' style={styles.headerText}>{title}</Text>
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
