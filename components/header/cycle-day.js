import React from 'react'
import {
  View,
  Text} from 'react-native'
import { LocalDate } from 'js-joda'
import moment from 'moment'
import styles from '../../styles'
import NavigationArrow from './navigation-arrow'

const FormattedDate = ({ date }) => {
  const today = LocalDate.now()
  const dateToDisplay = LocalDate.parse(date)
  const formattedDate = today.equals(dateToDisplay) ? 'today' : moment(date).format('MMMM Do YYYY')
  return formattedDate.toLowerCase()
}

export default function CycleDayHeader({ date, ...props }) {
  return (<View style={[styles.header, styles.headerCycleDay]}>
    <View
      style={styles.accentCircle}
      left={props.middle - styles.accentCircle.width / 2}
    />
    <NavigationArrow direction='left' {...props}/>
    <View>
      <Text style={styles.dateHeader}>
        <FormattedDate date={date} />
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