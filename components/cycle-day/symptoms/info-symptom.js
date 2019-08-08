import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import AppText from '../../app-text'
import labels from '../../../i18n/en/symptom-info.js'
import styles, {iconStyles} from '../../../styles/index'

export default function InfoSymptom(props) {
  return (
    <View style={styles.infoPopUpWrapper}>
      <View style={styles.dimmed}></View>
      <View style={styles.infoPopUp} testID="symptomInfoPopup">
        <TouchableOpacity onPress={props.close} style={styles.infoSymptomClose}>
          <Icon name='close' {...iconStyles.infoPopUpClose}/>
        </TouchableOpacity>
        <ScrollView style={styles.infoSymptomText}>
          <AppText>{labels[props.symptom].text}</AppText>
        </ScrollView>
      </View>
    </View>
  )
}
