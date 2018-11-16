import React from 'react'
import {
  View,
  Text} from 'react-native'
import styles, { iconStyles } from '../../styles'
import Icon from 'react-native-vector-icons/Entypo'
import FeatherIcon from 'react-native-vector-icons/Feather'

export default function SymptomViewHeader(props) {
  return (
    <View style={[styles.header, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={props.middle - styles.accentCircle.width / 2}
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
  )
}