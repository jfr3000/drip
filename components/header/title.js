import React from 'react'
import { View, Text} from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../styles'

export default function Title({ title, subtitle }) {

  if (subtitle !== undefined) {
    return (
      <View>
        <Text style={styles.dateHeader} testID='headerTitle'>
          { // design wants everyhting lowercased, but we don't
            // have CSS pseudo properties
            title.toLowerCase()}
        </Text>
        { subtitle &&
          <Text style={styles.cycleDayNumber} testID='headerSubtitle'>
            {subtitle.toLowerCase()}
          </Text>
        }
      </View>
    )
  }

  return (
    <Text testID='headerTitle' style={styles.headerText}>
      {title.toLowerCase()}
    </Text>
  )
}

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
