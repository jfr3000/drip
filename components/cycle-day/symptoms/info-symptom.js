import React from 'react'
import { ScrollView } from 'react-native'
import AppText from '../../app-text'
import labels from '../../../i18n/en/symptom-info.js'
import FramedSegment from '../../framed-segment'
import styles from '../../../styles/index'
import SymptomView from './symptom-view'

export default class InfoSymptom extends SymptomView {
  render() {
    const symptomView = this.props.symptomView
    const symptomMapping = {
      BleedingEditView: 'bleeding',
      CervixEditView: 'cervix',
      DesireEditView: 'desire',
      MoodEditView: 'mood',
      MucusEditView: 'mucus',
      NoteEditView: 'note',
      PainEditView: 'pain',
      SexEditView: 'sex',
      TemperatureEditView: 'temperature'
    }
    const currentSymptom = symptomMapping[symptomView]

    return (
      <ScrollView>
        <FramedSegment
          style={styles.framedSegmentLast}
          title={labels[currentSymptom].title}
        >
          <AppText>{labels[currentSymptom].text}</AppText>
        </FramedSegment>
      </ScrollView>
    )
  }
}
