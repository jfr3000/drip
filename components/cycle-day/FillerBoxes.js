import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import styles from '../../styles'

export default class FillerBoxes extends Component {
  render() {
    const n = Dimensions.get('window').width / styles.symptomBox.width
    const fillerBoxes = []
    for (let i = 0; i < Math.ceil(n); i++) {
      fillerBoxes.push(
        <View
          width={styles.symptomBox.width}
          height={0}
          key={i.toString()}
        />
      )
    }
    return fillerBoxes
  }
}