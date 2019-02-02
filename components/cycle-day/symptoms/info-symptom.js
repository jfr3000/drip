import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import AppText from '../../app-text'
import labels from '../../../i18n/en/symptom-info.js'
import FramedSegment from '../../framed-segment'
import styles from '../../../styles/index'
import replace from '../../helpers/replace-url-with-text'

export default class InfoSymptom extends Component {
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
        <FramedSegment title={labels[currentSymptom].title}>
          <Hyperlink linkStyle={styles.link} linkText={replace} linkDefault>
            <AppText>{labels[currentSymptom].text}</AppText>
          </Hyperlink>
        </FramedSegment>
      </ScrollView>
    )
  }
}
