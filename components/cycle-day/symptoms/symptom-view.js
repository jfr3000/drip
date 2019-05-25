import React, { Component } from 'react'
import {
  BackHandler, View, Alert, TouchableOpacity
} from 'react-native'
import { saveSymptom } from '../../../db'
import InfoPopUp from './info-symptom'
import Header from '../../header/symptom-view'
import { headerTitles } from '../../../i18n/en/labels'
import { sharedDialogs } from '../../../i18n/en/cycle-day'
import FeatherIcon from 'react-native-vector-icons/Feather'
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
    this.navigate = props.navigate
    this.state = {
      showInfo: false
    }
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
        <View flex={1}>
          { this.renderContent() }
          <TouchableOpacity
            onPress={() => {
              this.setState({showInfo: true})
            }}
            style={styles.infoButtonSymptomView}
          >
            <FeatherIcon
              name="info"
              {...iconStyles.infoInSymptomView}
              style={iconStyles.symptomInfo}
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