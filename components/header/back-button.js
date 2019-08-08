import React from 'react'
import {
  Text,
  View
} from 'react-native'
import styles from '../../styles'
import NavigationArrow from './navigation-arrow'

export default function BackButtonHeader(props) {
  return (
    <View style={[styles.header, styles.headerCycleDay, styles.headerSymptom]}>
      <View
        style={styles.accentCircle}
        left={props.middle - styles.accentCircle.width / 2}
      />
      <NavigationArrow testID='backButton' direction='left' {...props}/>
      <View>
        <Text style={styles.headerText} testID='pageTitle'>
          {props.title}
        </Text>
      </View>
    </View>
  )
}
