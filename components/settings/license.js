import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import AppText from '../app-text'
import styles from '../../styles/index'
import labels from '../../i18n/en/settings'

export default class License extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.framedSegment}>
          <AppText style={styles.framedSegmentTitle}>{`${labels.license.title} `}</AppText>
          <AppText>{`${labels.license.text} `}</AppText>
        </View>
      </ScrollView>
    )
  }
}
