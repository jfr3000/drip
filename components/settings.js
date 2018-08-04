import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  ScrollView
} from 'react-native'
import Share from 'react-native-share'
import { Base64 } from 'js-base64'
import styles from '../styles/index'
import objectPath from 'object-path'

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
                const data = makeDataURI()
                console.log(data)
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

function makeDataURI() {
  //TODO handle empty DB
  const data = [{
    date: '2018-06-23',
    temperature: {
      value: 36.8,
      exclude: false
    }
  }]
  const csv = transformToCsv(data)
  const encoded = Base64.encodeURI(csv)
  return `data:text/csv;base64,${encoded}`
}

function transformToCsv(json) {
  const day = json[0]
  const columnNames = getPrefixedKeys(day)
  const rows = json
    .map(day => {
      return columnNames.map(column => {
        return objectPath.get(day, column, '')
      })
    })
    .map(row => row.join(','))

  rows.unshift(columnNames.join(','))
  return rows.join('\n')
}

function getPrefixedKeys(obj, prefix) {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? [prefix, key].join('.') : key
    if (typeof obj[key] != 'object') {
      acc.push(prefixedKey)
      return acc
    }
    acc.push(...getPrefixedKeys(obj[key], prefixedKey))
    return acc
  }, [])
}