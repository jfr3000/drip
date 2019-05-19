import React from 'react'
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import styles from '../../styles'
import NavigationArrow from './navigation-arrow'
import Icon from 'react-native-vector-icons/Entypo'

export default function BackButtonHeader(props) {
  return (
    <View style={[styles.header, styles.headerCycleDay, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={props.middle - styles.accentCircle.width / 2}
      />
      <NavigationArrow direction='left' {...props}/>
      <View>
        <Text style={styles.headerText}>
          {props.title}
        </Text>
      </View>
      <TouchableOpacity>
        <Icon
          name={'chevron-thin-right'}
        />
      </TouchableOpacity>
    </View>
  )
}
