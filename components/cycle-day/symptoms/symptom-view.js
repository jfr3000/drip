import React, { Component } from 'react'
import {
  View, Alert, TouchableOpacity
} from 'react-native'
import { saveSymptom } from '../../../db'
import InfoPopUp from './info-symptom'
import Header from '../../header/symptom-view'
import { headerTitles } from '../../../i18n/en/labels'
import { sharedDialogs } from '../../../i18n/en/cycle-day'
import Icon from 'react-native-vector-icons/Entypo'
import styles, { iconStyles } from '../../../styles'

export default class SymptomView extends Component {
  constructor(props) {
    super()
    this.date = props.date
    this.navigate = props.navigate
    this.state = {
      showInfo: false
    }
  }

  componentDidUpdate() {
    this.autoSave()
  }

  saveSymptomEntry(entry) {
    saveSymptom(this.symptomName, this.date, entry)
  }

  deleteSymptomEntry() {
    saveSymptom(this.symptomName, this.date)
  }

  isDeleteIconActive() {
    const symptomValueHasBeenFilledOut = key => {
      // the state tracks whether the symptom info should be shown,
      // we ignore that property
      if (key === 'showInfo') return
      // is there any meaningful value in the current state?
      return this.state[key] || this.state[key] === 0
    }

    const symptomValues =  Object.keys(this.state)

    return symptomValues.some(symptomValueHasBeenFilledOut)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={headerTitles[this.symptomName].toLowerCase()}
          date={this.date}
          goBack={this.props.handleBackButtonPress}
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
                  this.props.handleBackButtonPress()
                }
              }]
            )
          }}
        />
        <View flex={1}>
          { this.renderContent() }
          <TouchableOpacity
            onPress={() => {
              this.setState({showInfo: true})
            }}
            style={styles.infoButtonSymptomView}
            testID="symptomInfoButton"
          >
            <Icon
              name="info-with-circle"
              style={iconStyles.info}
            />
          </TouchableOpacity>
          { this.state.showInfo &&
              <InfoPopUp
                symptom={this.symptomName}
                close={() => this.setState({showInfo: false})}
              />
          }
        </View>
      </View>
    )
  }
}