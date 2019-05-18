import React, { Component } from 'react'
import {
  BackHandler, View, Alert, TouchableOpacity
} from 'react-native'
import { saveSymptom } from '../../../db'
import Header from '../../header/symptom-view'
import { headerTitles } from '../../../i18n/en/labels'
import { sharedDialogs } from '../../../i18n/en/cycle-day'
import FeatherIcon from 'react-native-vector-icons/Entypo'
import styles, { iconStyles } from '../../../styles'

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
        <TouchableOpacity
          onPress={() => {}}
          style={styles.infoButtonSymptomView}
        >
          <FeatherIcon
            name="info-with-circle"
            {...iconStyles.infoInSymptomView}
            style={styles.symptomInfoIcon}
          />
        </TouchableOpacity>
        {this.renderContent()}
      </View>
    )
  }
}