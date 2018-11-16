import React from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import styles, { iconStyles } from '../../styles'
import Icon from 'react-native-vector-icons/Entypo'
import FeatherIcon from 'react-native-vector-icons/Feather'
import CycleDayHeader from './cycle-day'

export default function Header(props) {
  const middle = Dimensions.get('window').width / 2
  return (
    props.isCycleDayOverView ?
      <CycleDayHeader
        middle={middle}
        {...props}
      />
      : props.isSymptomView ?
        <View style={[styles.header, styles.headerSymptom]}>
          <View
            style={styles.accentCircle}
            left={middle - styles.accentCircle.width / 2}
          />
          <Icon
            name='chevron-thin-left'
            {...iconStyles.navigationArrow}
            onPress={() => props.goBack()}

          />
          <View>
            <Text style={styles.dateHeader}>
              {props.title}
            </Text>
          </View >
          <FeatherIcon
            name='info'
            {...iconStyles.symptomHeaderIcons}
          />
        </View>
        :
        <View style={styles.header}>
          <View style={styles.accentCircle} />
          <Text style={styles.headerText}>
            {props.title}
          </Text>
        </View >
  )
}