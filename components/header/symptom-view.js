import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import styles, { iconStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather'
import NavigationArrow from './navigation-arrow'
import formatDate from '../helpers/format-date'

export default function SymptomViewHeader(props) {
  const middle = Dimensions.get('window').width / 2
  return (
    <View style={[styles.header, styles.headerCycleDay, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={middle - styles.accentCircle.width / 2}
      />
      <NavigationArrow
        direction='left'
        {...props}
      />
      <View>
        <Text style={styles.dateHeader}>
          {props.title}
        </Text>
        <Text style={styles.cycleDayNumber}>
          {formatDate(props.date)}
        </Text>
      </View >
      <TouchableOpacity
        onPress={() => props.goToSymptomInfo()}
        style={styles.infoButton}
      >
        <FeatherIcon
          name="info"
          style={styles.symptomInfoIcon}
          {...iconStyles.symptomHeaderIcons}
        />
      </TouchableOpacity>

    </View>
  )
}
