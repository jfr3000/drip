import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  ScrollView
} from 'react-native'
import Share from 'react-native-share'
import { Base64 } from 'js-base64'
import objectPath from 'object-path'
import { getColumnNamesForCsv, cycleDaysSortedByDate } from '../db'
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
                // TODO show warning that there is nothing to export
                if (!cycleDaysSortedByDate.length) return
                const data = makeDataURI(cycleDaysSortedByDate)
                try {
                  await Share.open({
                    title: 'My Drip data export',
                    url: data,
                    subject: 'My Drip data export',
                    type: 'text/csv',
                    showAppsToView: true
                  })
                } catch (err) {
                  // TODO handle error
                  console.log(err)
                }
              }}
              title="Edit symptoms for today">
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

function makeDataURI(cycleDays) {
  const csv = transformToCsv(cycleDays)
  const encoded = Base64.encodeURI(csv)
  return `data:text/csv;base64,${encoded}`
}

function transformToCsv(cycleDays) {
  const columnNames = getColumnNamesForCsv()
  const rows = cycleDays
    .map(day => {
      return columnNames.map(column => {
        return objectPath.get(day, column, '')
      })
    })
    .map(row => row.join(','))

  rows.unshift(columnNames.join(','))
  return rows.join('\n')
}
