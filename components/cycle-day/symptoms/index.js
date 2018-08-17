import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'
import styles from '../../../styles'
import actionButtonModule from '../action-buttons'
import BleedingEditView from './bleeding'
import TemperatureEditView from './temperature'
import MucusEditView from './mucus'
import CervixEditView from './cervix'
import NoteEditView from './note'
import DesireEditView from './desire'
import SexEditView from './sex'

const symptomViews = {
  BleedingEditView,
  TemperatureEditView,
  MucusEditView,
  CervixEditView,
  NoteEditView,
  DesireEditView,
  SexEditView
}
const titles = {
  BleedingEditView: 'Bleeding',
  TemperatureEditView: 'Temperature',
  MucusEditView: 'Mucus',
  CervixEditView: 'Cervix',
  NoteEditView: 'Note',
  DesireEditView: 'Desire',
  SexEditView: 'Sex'
}

export default class SymptomView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleComponent: props.navigation.state.params.symptom,
      cycleDay: props.navigation.state.params.cycleDay
    }

    this.showView = view => {
      this.setState({visibleComponent: view})
    }
    this.makeActionButtons = actionButtonModule(this.showView)
  }

  render() {
    return (
      <ScrollView>
        <View style={ styles.header }>
          <View>
            <Text style={styles.dateHeader}>
              {titles[this.state.visibleComponent]}
            </Text>
          </View >
        </View >
        {React.createElement(
          symptomViews[this.state.visibleComponent],
          {
            cycleDay: this.state.cycleDay,
            makeActionButtons: this.makeActionButtons
          }
        )}
      </ScrollView >
    )
  }
}
