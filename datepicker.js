import React, { Component } from 'react'
import {
  View, Button, DatePickerAndroid
} from 'react-native'
import moment from 'moment'
import * as styles from './styles'

export default class datePickView extends Component {
  constructor(props) {
    super(props)
  }

  async pickDate() {
    const result = await DatePickerAndroid.open({
      date: new Date()
    })
    if (result.action !== DatePickerAndroid.dismissedAction) {
      const navigate = this.props.navigation.navigate
      // continue here and actually make that view
      navigate(
        'dayView',
        { date: moment(new Date(result.year, result.month, result.day)) }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={ this.pickDate.bind(this) } title="pick a date" />
      </View>
    )
  }
}

