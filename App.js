import React, { Component } from 'react'
import {
  View,
  Button
} from 'react-native'
import * as styles from './styles'

export default class home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {}}
          title="Home"></Button>
      </View>
    )
  }
}
