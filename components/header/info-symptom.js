import React from 'react'
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import styles, { iconStyles } from '../../styles'
import NavigationArrow from './navigation-arrow'
import Icon from 'react-native-vector-icons/Entypo'

export default function InfoSymptomHeader(props) {
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
      <TouchableOpacity style={styles.hiddenIcon}>
        <Icon
          name={'chevron-thin-right'}
          {...iconStyles.hiddenIcon}
        />
      </TouchableOpacity>
    </View>
  )
}
