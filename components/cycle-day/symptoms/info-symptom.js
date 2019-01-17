import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import AppText from '../../app-text'
import * as labels from '../../../i18n/en/symptom-info.js'

export default class InfoSymptom extends Component {
  render() {
    const symptomView = this.props.symptomView
    const symptomMapping = {
      BleedingEditView: 'bleeding',
      CervixEditView: 'cervix',
      DesireEditView: 'desire',
      MucusEditView: 'mucus',
      NoteEditView: 'note',
      PainEditView: 'pain',
      SexEditView: 'sex',
      TemperatureEditView: 'temperature'
    }
    const currentSymptom = symptomMapping[symptomView]
    const currentSymptomText = labels.symptomInfo[currentSymptom]
    const currentSymptomTitle = labels.symptomTitle[currentSymptom]
    return (
      <ScrollView>
        <View style={[styles.textWrappingView]}>
          <AppText style={styles.title}>
            {currentSymptomTitle}
          </AppText>
          <AppText style={styles.paragraph}>
            {currentSymptomText}
            {labels.symptomTitle.currentSymptomTitle}
          </AppText>
          <AppText style={styles.paragraph}>
            {labels.symptomInfo.currentSymptomText}
          </AppText>
        </View>
      </ScrollView>
    )
  }
}
