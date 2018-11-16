import React from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import styles from '../../styles'
import CycleDayHeader from './cycle-day'
import SymptomViewHeader from './symptom-view'

export default function Header(props) {
  const middle = Dimensions.get('window').width / 2
  return (
    props.isCycleDayOverView ?
      <CycleDayHeader
        middle={middle}
        {...props}
      />
      : props.isSymptomView ?
        <SymptomViewHeader
          middle={middle}
          {...props}
        />
        :
        <View style={styles.header}>
          <View style={styles.accentCircle} />
          <Text style={styles.headerText}>
            {props.title}
          </Text>
        </View >
  )
}