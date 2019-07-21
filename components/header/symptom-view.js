import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import styles, { iconStyles } from '../../styles'
import Icon from 'react-native-vector-icons/AntDesign'
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
        <Text style={styles.dateHeader} testID='symptomViewTitleName'>
          {props.title}
        </Text>
        <Text style={styles.cycleDayNumber} testID='symptomViewTitleDate'>
          {formatDate(props.date)}
        </Text>
      </View >
      { props.deleteIconActive &&
        <TouchableOpacity
          onPress={props.deleteEntry}
          style={[
            styles.headerDeleteButton,
          ]}
        >
          <Icon
            name="delete"
            {...iconStyles.symptomHeaderIcons}
          />
        </TouchableOpacity>
      }

    </View>
  )
}
