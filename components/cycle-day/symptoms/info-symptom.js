import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import AppText from '../../common/app-text'
import labels from '../../../i18n/en/symptom-info.js'
import styles, {iconStyles} from '../../../styles/index'

export default function InfoSymptom({ close, symptom }) {
  return (
    <View style={styles.infoPopUpWrapper}>
      <View style={styles.dimmed}></View>
      <View style={styles.infoPopUp} testID="symptomInfoPopup">
        <TouchableOpacity onPress={close} style={styles.infoSymptomClose}>
          <Icon name='close' {...iconStyles.infoPopUpClose}/>
        </TouchableOpacity>
        <ScrollView style={styles.infoSymptomText}>
          <AppText>{labels[symptom].text}</AppText>
        </ScrollView>
      </View>
    </View>
  )
}

InfoSymptom.propTypes = {
  close: PropTypes.func.isRequired,
  symptom: PropTypes.string.isRequired
}
