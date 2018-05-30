import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList
} from 'react-native'
import * as styles from './styles'
import Datastore from 'react-native-local-mongodb'

const db = new Datastore({ filename: 'asyncStorageKey', autoload: true })

export default class Temp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temperatures: []
    }
    db.find({ key: { $exists: true } }, (err, persistedTemperatures) => {
      if (err) throw err
      this.setState({
        temperatures: [...persistedTemperatures, ...this.state.temperatures]
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter your temperature"
          onChangeText={(val) => {
            this.setState({currentValue: val})
          }}
        />
        <Button
          onPress={() => {
            const newTemp = {
              value: this.state.currentValue,
              key: Date.now().toString()
            }
            this.setState({
              temperatures: [newTemp, ...this.state.temperatures]
            })
            db.insert(newTemp, (err) => {
              if (err) console.log(err)
            })
          }}
          title="Save"
        />
        <FlatList
          data = {this.state.temperatures}
          extraData = {this.state}
          renderItem={({item}) => <Text>{item.value}</Text>}
        />
      </View>
    )
  }
}
