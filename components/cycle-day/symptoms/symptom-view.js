import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import { saveSymptom } from '../../../db'
import Header from '../../header/symptom-view'
import { headerTitles } from '../../../i18n/en/labels'

export default class SymptomView extends Component {
  constructor(props) {
    super()
    // every specific symptom view provides their own onBackButtonPress method
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPress.bind(this))
    this.globalBackhandler = props.handleBackButtonPress
    this.date = props.date
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
          goBack={() => {
            this.onBackButtonPress()
            this.globalBackhandler()
          }}
          deleteEntry={() => {
            this.deleteSymptomEntry()
            this.globalBackhandler()
          }}
        />
        {this.renderContent()}
      </View>
    )
  }
}