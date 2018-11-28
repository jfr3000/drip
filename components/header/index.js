import React from 'react'
import {
  View,
  Text,
  Dimensions
} from 'react-native'
import styles from '../../styles'
import CycleDayHeader from './cycle-day'
import SymptomViewHeader from './symptom-view'

export default function Header(p) {
  const middle = Dimensions.get('window').width / 2
  const props = Object.assign({}, p, {middle})
  return (
    props.isCycleDayOverView ?
      <CycleDayHeader {...props} />
      : props.isSymptomView ?
        <SymptomViewHeader {...props}/>
        :
        <View style={styles.header}>
          <View style={styles.accentCircle} />
          <Text style={styles.headerText}>
            {props.title}
          </Text>
        </View >
  )
}