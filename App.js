import React, { Component } from 'react'
import {
  View,
  Button,
  Text
} from 'react-native'
import styles from './styles'

export default class home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome! Today is day 6 of your current cycle</Text>
        <Button
          onPress={goToSymptomEdit}
          title="Edit symptoms for today">
        </Button>
        <Button
          onPress={goToCalendar}
          title="Go to calendar">
        </Button>
      </View>
    )
  }
}

function goToSymptomEdit () {
  
}
function goToCalendar () {}
