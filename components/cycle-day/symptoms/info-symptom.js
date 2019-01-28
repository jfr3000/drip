import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import AppText from '../../app-text'
import * as labels from '../../../i18n/en/symptom-info.js'
import SettingsSegment from '../../settings/shared/settings-segment'

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

    return (
      <ScrollView>
        <SettingsSegment title={labels.symptomTitle[currentSymptom]}>
          <AppText>{labels.symptomInfo[currentSymptom]}</AppText>
        </SettingsSegment>
      </ScrollView>
    )
  }
}
