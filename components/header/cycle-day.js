import React from 'react'
import {
  View,
  Text} from 'react-native'
import moment from 'moment'
import styles from '../../styles'
import NavigationArrow from './navigation-arrow'

export default function CycleDayHeader(props) {
  return (<View style={[styles.header, styles.headerCycleDay]}>
    <View
      style={styles.accentCircle}
      left={props.middle - styles.accentCircle.width / 2}
    />
    <NavigationArrow direction='left' {...props}/>
    <View>
      <Text style={styles.dateHeader}>
        {moment(props.date).format('MMMM Do YYYY')}
      </Text>
      {props.cycleDayNumber &&
        <Text style={styles.cycleDayNumber}>
          Cycle day {props.cycleDayNumber}
        </Text>}
    </View>
    <NavigationArrow direction='right' {...props}/>
  </View>
  )
}