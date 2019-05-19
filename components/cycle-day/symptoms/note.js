import React from 'react'
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import infoLabels from '../../../i18n/en/symptom-info'
import { noteExplainer } from '../../../i18n/en/cycle-day'
import { shared as sharedLabels } from '../../../i18n/en/labels'
import styles, { iconStyles } from '../../../styles'

import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

export default class Note extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.note = cycleDay && cycleDay.note

    this.state = {
      currentValue: this.note && this.note.value || ''
    }
  }

  symptomName = 'note'

  showInfoBox(){
    const symptomName = 'note'
    Alert.alert(
      infoLabels[symptomName].title,
      infoLabels[symptomName].text
    )
  }

  onBackButtonPress() {
    if (!this.state.currentValue) {
      this.deleteSymptomEntry()
      return
    }
    this.saveSymptomEntry({
      value: this.state.currentValue
    })
  }

  renderContent() {
    return (
      <ScrollView style={styles.page}>
        <View style={{ flexDirection: 'row' }}>
          <SymptomSection
            explainer={noteExplainer}
          >
            <TextInput
              autoFocus={!this.state.currentValue}
              multiline={true}
              placeholder={sharedLabels.enter}
              onChangeText={(val) => {
                this.setState({ currentValue: val })
              }}
              value={this.state.currentValue}
            />
          </SymptomSection>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            onPress={this.showInfoBox}
            style={styles.infoButton}
          >
            <FeatherIcon
              name="info"
              style={iconStyles.symptomInfo}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}
