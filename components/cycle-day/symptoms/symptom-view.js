import React, { Component } from 'react'
import {
  BackHandler, View, Alert, TouchableOpacity
} from 'react-native'
import { saveSymptom } from '../../../db'
import Header from '../../header/symptom-view'
import { headerTitles } from '../../../i18n/en/labels'
import { sharedDialogs } from '../../../i18n/en/cycle-day'
import FeatherIcon from 'react-native-vector-icons/Feather'
import styles, { iconStyles } from '../../../styles'
import infoLabels from '../../../i18n/en/symptom-info'

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

  isDeleteIconActive() {
    return Object.values(this.state).some(value => {
      // is there any meaningful value in the current state?
      return value || value === 0
    })
  }

  showInfoBox(){
    Alert.alert(
      infoLabels[this.symptomName].title,
      infoLabels[this.symptomName].text
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={headerTitles[this.symptomName].toLowerCase()}
          date={this.date}
          goBack={this.handleBackButtonPressOnSymptomView.bind(this)}
          deleteIconActive={this.isDeleteIconActive()}
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
        <View>
          <TouchableOpacity
            onPress={this.showInfoBox.bind(this)}
            style={styles.infoButtonSymptomView}
          >
            <FeatherIcon
              name="info"
              {...iconStyles.infoInSymptomView}
              style={iconStyles.symptomInfo}
            />
          </TouchableOpacity>
          {this.renderContent()}
        </View>
      </View>
    )
  }
}