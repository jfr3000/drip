import React from 'react'
import {
  Alert,
  Switch,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'

import { bleeding } from '../../../i18n/en/cycle-day'
import infoLabels from '../../../i18n/en/symptom-info'
import styles, { iconStyles } from '../../../styles'

import SelectTabGroup from '../select-tab-group'

import SymptomSection from './symptom-section'
import SymptomView from './symptom-view'

export default class Bleeding extends SymptomView {
  constructor(props) {
    super(props)
    const cycleDay = props.cycleDay
    this.bleeding = cycleDay && cycleDay.bleeding
    this.state = {
      currentValue: this.bleeding && this.bleeding.value,
      exclude: this.bleeding ? this.bleeding.exclude : false
    }
  }

  symptomName = 'bleeding'

  showInfoBox(){
    const symptomName = 'bleeding'
    Alert.alert(
      infoLabels[symptomName].title,
      infoLabels[symptomName].text
    )
  }

  onBackButtonPress() {
    if (typeof this.state.currentValue != 'number') {
      this.deleteSymptomEntry()
      return
    }
    this.saveSymptomEntry({
      value: this.state.currentValue,
      exclude: this.state.exclude
    })
  }

  renderContent() {
    const bleedingRadioProps = [
      { label: bleeding.labels[0], value: 0 },
      { label: bleeding.labels[1], value: 1 },
      { label: bleeding.labels[2], value: 2 },
      { label: bleeding.labels[3], value: 3 },
    ]
    return (
      <ScrollView style={styles.page}>
        <View style={{ flexDirection: 'row' }}>
          <SymptomSection
            header={bleeding.heaviness.header}
            explainer={bleeding.heaviness.explainer}
          >
            <SelectTabGroup
              buttons={bleedingRadioProps}
              active={this.state.currentValue}
              onSelect={val => this.setState({ currentValue: val })}
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
        <SymptomSection
          header={bleeding.exclude.header}
          explainer={bleeding.exclude.explainer}
          inline={true}
        >
          <Switch
            onValueChange={(val) => {
              this.setState({ exclude: val })
            }}
            value={this.state.exclude}
          />
        </SymptomSection>
      </ScrollView>
    )
  }
}