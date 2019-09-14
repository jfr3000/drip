import React, { Component } from 'react'
import { ScrollView, View, Alert } from 'react-native'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getDate } from '../../../slices/date'

import { saveSymptom } from '../../../db'
import formatDate from '../../helpers/format-date'

import Header from '../../header'
import SymptomInfo from './symptom-info'

import { headerTitles } from '../../../i18n/en/labels'
import { sharedDialogs } from '../../../i18n/en/cycle-day'

import styles from '../../../styles'

class SymptomView extends Component {

  static propTypes = {
    symptom: PropTypes.string.isRequired,
    values: PropTypes.object,
    date: PropTypes.string,
  }

  constructor(props) {
    super()
    this.values = props.values
    this.state = {
      shouldShowDelete: this.checkIfHasValuesToDelete()
    }
    this.date = props.date
    this.navigate = props.navigate
  }

  componentDidUpdate() {
    const shouldShowDelete = this.checkIfHasValuesToDelete()
    if (shouldShowDelete !== this.state.shouldShowDelete) {
      this.setState({ shouldShowDelete: this.checkIfHasValuesToDelete() })
    }
  }

  deleteSymptomEntry() {
    const { symptom, date } = this.props
    saveSymptom(symptom, date, null)
  }

  checkIfHasValuesToDelete() {
    const valueHasBeenFilledOut = key => {
      // is there any meaningful value in the current state?
      return this.values[key] || this.values[key] === 0
    }

    const valuesKeys =  Object.keys(this.values)

    return valuesKeys.some(valueHasBeenFilledOut)
  }

  onDeleteConfirmation = () => {
    this.deleteSymptomEntry()
    this.props.handleBackButtonPress()
  }

  showConfirmationAlert = () => {

    const cancelButton = {
      text: sharedDialogs.cancel,
      style: 'cancel'
    }

    const confirmationButton = {
      text: sharedDialogs.reallyDeleteData,
      onPress: this.onDeleteConfirmation
    }

    return Alert.alert(
      sharedDialogs.areYouSureTitle,
      sharedDialogs.areYouSureToDelete,
      [cancelButton, confirmationButton]
    )
  }

  showConfirmationAlert = () => {

    const cancelButton = {
      text: sharedDialogs.cancel,
      style: 'cancel'
    }

    const confirmationButton = {
      text: sharedDialogs.reallyDeleteData,
      onPress: this.onDeleteConfirmation
    }

    return Alert.alert(
      sharedDialogs.areYouSureTitle,
      sharedDialogs.areYouSureToDelete,
      [cancelButton, confirmationButton]
    )
  }

  render() {
    const { symptom } = this.props
    return (
      <View style={{flex: 1}}>
        <Header
          title={headerTitles[symptom].toLowerCase()}
          subtitle={formatDate(this.date)}
          handleBack={this.props.handleBackButtonPress}
          handleDelete={
            this.state.shouldShowDelete && this.showConfirmationAlert
          }
        />
        <View flex={1}>
          <ScrollView style={styles.page}>
            {this.props.children}
          </ScrollView>
          <SymptomInfo symptom={symptom} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    date: getDate(state)
  })
}

export default connect(
  mapStateToProps,
  null
)(SymptomView)
