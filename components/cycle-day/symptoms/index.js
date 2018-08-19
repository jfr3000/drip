import React, { Component } from 'react'
import { ScrollView, BackHandler } from 'react-native'
import Header from '../../header'
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
      visibleComponent: props.symptom,
      cycleDay: props.cycleDay
    }

    this.makeActionButtons = actionButtonModule(() => {
      this.props.navigate('CycleDay', {cycleDay: this.state.cycleDay})
    })

    const handleBackButtonPress = function() {
      this.props.navigate('CycleDay', {cycleDay: this.state.cycleDay})
      return true
    }.bind(this)

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    return (
      <ScrollView>
        <Header title={titles[this.state.visibleComponent]}/>
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
