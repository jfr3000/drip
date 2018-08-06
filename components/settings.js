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
                    return Alert.alert('There is no data to export')
                  }
                } catch (err) {
                  console.error(err)
                  return Alert.alert('Could not convert data to CSV')
                }

                try {
                  await Share.open({
                    title: 'My Drip data export',
                    url: data,
                    subject: 'My Drip data export',
                    type: 'text/csv',
                    showAppsToView: true
                  })
                } catch (err) {
                  console.error(err)
                  return Alert.alert('There was a problem sharing the data export file')
                }
              }}
              title="Export data">
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}