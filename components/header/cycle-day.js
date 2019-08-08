import React from 'react'
import {
  View,
  Text} from 'react-native'
import styles from '../../styles'
import NavigationArrow from './navigation-arrow'
import formatDate from '../helpers/format-date'

export default function CycleDayHeader({ date, ...props }) {
  return (<View style={[styles.header, styles.headerCycleDay]}>
    <View
      style={styles.accentCircle}
      left={props.middle - styles.accentCircle.width / 2}
    />
    <NavigationArrow direction='left' {...props}/>
    <View>
      <Text style={styles.dateHeader} testID='cycleDayTitleDate'>
        {formatDate(date)}
      </Text>
      {props.cycleDayNumber &&
        <Text style={styles.cycleDayNumber}>
          {`Cycle day ${props.cycleDayNumber}`.toLowerCase()}
        </Text>}
    </View>
    <NavigationArrow direction='right' {...props}/>
  </View>
  )
}
