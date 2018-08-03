import React, { Component } from 'react'
import {
  View,
  Button,
  Text,
  ScrollView,
  Picker
} from 'react-native'
import Share from 'react-native-share'
import { Base64 } from 'js-base64'
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
              onPress={() => this.setState({pickerVisible: true})}
              title="Edit symptoms for today">
            </Button>
          </View>
        </View>
        {this.state.pickerVisible &&
          <Picker
            selectedValue='json'
            style={{ height: 50, width: 200 }}
            onValueChange={ async format => {
              const data = makeDataURI(format)
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
                console.log(err)
              }
            }}>
            <Picker.Item label="JSON" value="json" />
            <Picker.Item label="CSV" value="csv" />
          </Picker>
        }
      </ScrollView>
    )
  }
}

function makeDataURI(format) {
  const data = {hello: "world"}
  const encoded = Base64.encodeURI(JSON.stringify(data))
  return `data:text/csv;base64,${encoded}`
}