import React, { Component } from 'react'
import { BackHandler, View, Alert } from 'react-native'
import { saveSymptom } from '../../../db'
import Header from '../../header/symptom-view'
import { headerTitles } from '../../../i18n/en/labels'
import { sharedDialogs } from '../../../i18n/en/cycle-day'

export default class SymptomView extends Component {
  constructor(props) {
    super()
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressOnSymptomView.bind(this)
    )
    this.globalBackhandler = props.handleBackButtonPress
    this.date = props.date
  }

  async handleBackButtonPressOnSymptomView() {
    // every specific symptom view provides their own onBackButtonPress method
    const stopHere = await this.onBackButtonPress()
    if (!stopHere) this.globalBackhandler()
  }

  saveSymptomEntry(entry) {
    saveSymptom(this.symptomName, this.date, entry)
  }

  deleteSymptomEntry() {
    saveSymptom(this.symptomName, this.date)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={headerTitles[this.symptomName].toLowerCase()}
          date={this.date}
          goBack={this.handleBackButtonPressOnSymptomView.bind(this)}
          deleteEntry={() => {
            Alert.alert(
              sharedDialogs.areYouSureTitle,
              sharedDialogs.areYouSureToDelete,
              [{
                text: sharedDialogs.cancel,
                style: 'cancel'
              }, {
                text: sharedDialogs.reallyDeleteData,
                onPress: () => {
                  this.deleteSymptomEntry()
                  this.globalBackhandler()
                }
              }]
            )
          }}
        />
        {this.renderContent()}
      </View>
    )
  }
}