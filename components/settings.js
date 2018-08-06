import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  ScrollView,
  Alert
} from 'react-native'
import Share from 'react-native-share'
import getDataAsCsvDataUri from '../lib/export-to-csv'
import styles from '../styles/index'
import { settings as labels } from './labels'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pickerVisible: false
    }
  }

  render() {
    return (
      <ScrollView>
        <Text style={styles.welcome}>{this.state.welcomeText}</Text>
        <View style={styles.homeButtons}>
          <View style={styles.homeButton}>
            <Button
              onPress={async () => {
                let data
                try {
                  data = getDataAsCsvDataUri()
                  if (!data) {
                    return Alert.alert(labels.errors.noData)
                  }
                } catch (err) {
                  console.error(err)
                  return Alert.alert(labels.errors.couldNotConvert)
                }

                try {
                  await Share.open({
                    title: labels.exportTitle,
                    url: data,
                    subject: labels.exportSubject,
                    type: 'text/csv',
                    showAppsToView: true
                  })
                } catch (err) {
                  console.error(err)
                  return Alert.alert(labels.errors.problemSharing)
                }
              }}
              title={labels.buttonLabel}>
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}