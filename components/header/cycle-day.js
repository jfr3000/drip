import React from 'react'
import {
  View,
  Text} from 'react-native'
import moment from 'moment'
import styles, { iconStyles } from '../../styles'
import Icon from 'react-native-vector-icons/Entypo'

export default function CycleDayHeader(props) {
  return (<View style={[styles.header, styles.headerCycleDay]}>
    <View
      style={styles.accentCircle}
      left={props.middle - styles.accentCircle.width / 2}
    />
    <Icon name='chevron-thin-left' {...iconStyles.navigationArrow} onPress={() => props.goToCycleDay('before')} />
    <View>
      <Text style={styles.dateHeader}>
        {moment(props.date).format('MMMM Do YYYY')}
      </Text>
      {props.cycleDayNumber &&
        <Text style={styles.cycleDayNumber}>
          Cycle day {props.cycleDayNumber}
        </Text>}
    </View>
    <Icon name='chevron-thin-right' {...iconStyles.navigationArrow} onPress={() => props.goToCycleDay('after')} />
  </View>
  )
}